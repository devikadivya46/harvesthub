import express from 'express';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function startServer() {
  const app = express();
  const PORT = 3000;

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI || (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://'))) {
    console.warn('---------------------------------------------------------');
    console.warn('WARNING: MONGODB_URI is missing or has an invalid scheme.');
    console.warn('Please provide a valid MongoDB connection string in the Settings menu.');
    console.warn('The app will continue to run in "Demo Mode" without database persistence.');
    console.warn('---------------------------------------------------------');
  } else {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (err: any) {
      console.error('---------------------------------------------------------');
      console.error('MONGODB CONNECTION ERROR:', err.message);
      if (err.name === 'MongooseServerSelectionError') {
        console.error('\nPOSSIBLE CAUSE: Your IP address is not whitelisted in MongoDB Atlas.');
        console.error('FIX: Go to MongoDB Atlas > Network Access > Add IP Address > "Allow Access From Anywhere" (0.0.0.0/0).');
      }
      console.error('---------------------------------------------------------');
      console.log('Falling back to Demo Mode (In-memory storage)...');
    }
  }

  app.use(express.json());

  // In-memory fallback for Demo Mode
  const demoUsers: any[] = [];
  
  // Add a default test user to Demo Mode only if live DB fails
  const setupDemoMode = async () => {
    // We check connection state after a short delay to allow it to initialize
    setTimeout(async () => {
      if (mongoose.connection.readyState !== 1) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        demoUsers.push({
          name: 'Ramesh (Demo User)',
          email: 'farmer@example.com',
          password: hashedPassword,
          location: 'Pune, Maharashtra'
        });
        console.log('--- DEMO MODE ACTIVE ---');
        console.log('Default user added: farmer@example.com / password123');
        console.log('-------------------------');
      } else {
        console.log('--- LIVE DATABASE ACTIVE ---');
      }
    }, 1000);
  };
  setupDemoMode();

  // AI Routes
  app.post('/api/ai/crop-suggestion', async (req, res) => {
    try {
      const { ph, soilType, hasBorewell } = req.body;
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `As an agricultural expert, suggest 3 best crops for a farmer with the following conditions:
      - Soil pH: ${ph}
      - Soil Type: ${soilType}
      - Water source (Borewell): ${hasBorewell ? 'Available' : 'Not available'}
      
      Format your response as a JSON array of objects with keys: name, suitability (percentage string), detail (short description of why it fits), and sowingTime (months). 
      Example: [{"name": "Wheat", "suitability": "95%", "detail": "Loamy soil with 6.5 pH is ideal for wheat.", "sowingTime": "October - November"}]
      Only return the JSON.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response (Gemini sometimes wraps it in code blocks)
      const jsonMatch = text.match(/\[.*\]/s);
      const suggestions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
      
      res.json(suggestions);
    } catch (err) {
      console.error('AI Suggestion Error:', err);
      // Mock data in case of error (e.g. missing API key)
      res.json([
        { name: "Wheat (Fallback)", suitability: "90%", detail: "Reliable crop for most regional soils.", sowingTime: "Nov - Dec" },
        { name: "Mustard (Fallback)", suitability: "85%", detail: "Low water requirement fits your profile.", sowingTime: "Oct - Nov" }
      ]);
    }
  });

  app.post('/api/ai/identify-pest', async (req, res) => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = "The farmer uploaded an image of a pest with yellow wings and green body on cotton leaves. Identify it and suggest one organic treatment.";
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      res.json({ analysis: response.text() });
    } catch (err) {
      res.status(500).json({ error: 'AI analysis failed' });
    }
  });

  // Weather Proxy
  app.get('/api/weather', async (req, res) => {
    try {
      const { lat, lon, city } = req.query;
      const apiKey = process.env.OPENWEATHER_API_KEY || '40b5790f4ed8f51118227adac1d1952d';
      
      if (!apiKey || apiKey === 'your_openweather_api_key') {
        return res.json({ 
          temp: 32, 
          condition: 'Sunny', 
          location: city || 'Pune (Demo)', 
          isDemo: true 
        });
      }

      let url = '';
      if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      } else if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=${apiKey}`;
      }

      const response = await fetch(url);
      const data: any = await response.json();
      
      if (data.cod !== 200) throw new Error(data.message);

      res.json({
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        location: data.name,
        isDemo: false
      });
    } catch (err) {
      console.error('Weather Proxy Error:', err);
      res.json({ temp: 32, condition: 'Sunny', location: req.query.city || 'Pune', isDemo: true });
    }
  });

  // Market Prices Proxy (Data.gov.in)
  app.get('/api/market-prices', async (req, res) => {
    try {
      const apiKey = process.env.GOV_INDIA_API_KEY;
      if (!apiKey) {
        // Return dummy data if no API key
        return res.json([
          { name: 'Wheat (Demo)', mandi: 'Azadpur', price: '2,450', change: '+45', status: 'up' },
          { name: 'Onion (Demo)', mandi: 'Lasalgaon', price: '1,800', change: '-120', status: 'down' },
          { name: 'Cotton (Demo)', mandi: 'Rajkot', price: '7,200', change: '+300', status: 'up' },
          { name: 'Tomato (Demo)', mandi: 'Kolar', price: '1,200', change: '-50', status: 'down' }
        ]);
      }

      // Resource ID for Mandi prices
      const resourceId = '9ef273d1-c1aa-42da-8591-13175f850742';
      const response = await fetch(`https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=10`);
      const data: any = await response.json();
      
      // Map API record to our frontend format
      const records = data.records.map((r: any) => ({
        name: r.commodity,
        mandi: r.market,
        price: r.modal_price,
        change: '--', // API might not give direct trend, can calculate if we store history
        status: 'neutral'
      }));

      res.json(records);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch market prices' });
    }
  });

  // Sample API Routes
  app.get('/api/health', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({ 
      status: 'ok', 
      mode: isConnected ? 'Live Database (MongoDB)' : 'Demo Mode (In-memory)',
      dbConnected: isConnected
    });
  });

  // User Schema & Model (Basic Example)
  const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String }, // Missing in previous schema definition but used in logic
    farmSize: Number,
    location: String,
    primaryCrop: String,
    createdAt: { type: Date, default: Date.now }
  }, { bufferCommands: false }); // Disable buffering to prevent timeouts when DB is down
  
  const User = mongoose.models.User || mongoose.model('User', userSchema);

  // Auth Routes
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { name, email, password, location } = req.body;
      const isDbConnected = mongoose.connection.readyState === 1;

      if (isDbConnected) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({ 
          name, 
          email, 
          password: hashedPassword,
          location 
        });
        await newUser.save();
      } else {
        // Demo Mode Fallback
        const existingDemoUser = demoUsers.find(u => u.email === email);
        if (existingDemoUser) {
          return res.status(400).json({ error: 'User already exists (Demo Mode)' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        demoUsers.push({ name, email, password: hashedPassword, location });
        console.log('User signed up in Demo Mode (In-memory)');
      }
      
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ error: 'Signup failed. Please check your database connection or try again.' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const isDbConnected = mongoose.connection.readyState === 1;
      let user;

      if (isDbConnected) {
        user = await User.findOne({ email });
      } else {
        // Demo Mode Fallback
        user = demoUsers.find(u => u.email === email);
      }
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      res.json({ 
        message: 'Login successful',
        user: { name: user.name, email: user.email, location: user.location }
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed. Please check your database connection or try again.' });
    }
  });

  app.get('/api/user/profile', async (req, res) => {
    // In a real app, this would use auth middleware
    res.json({ 
      name: 'Ramesh Patil',
      email: 'ramesh@example.com',
      farmSize: 5,
      location: 'Pune, Maharashtra',
      primaryCrop: 'Wheat'
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
