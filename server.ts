import express from 'express';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.warn('WARNING: MONGODB_URI is not defined in environment variables.');
  } else {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }

  app.use(express.json());

  // Sample API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', msg: 'Kisan Sahay Backend is running with MongoDB' });
  });

  // User Schema & Model (Basic Example)
  const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    farmSize: Number,
    location: String,
    primaryCrop: String,
    createdAt: { type: Date, default: Date.now }
  });
  
  const User = mongoose.models.User || mongoose.model('User', userSchema);

  // Auth Routes
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      
      // In a real app we'd hash the password with bcrypt
      // const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = new User({ name, email, password }); // Temporarily storing plain text or simplified for demo
      await newUser.save();
      
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Signup failed' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // In a real app we'd return a JWT
      res.json({ 
        message: 'Login successful',
        user: { name: user.name, email: user.email }
      });
    } catch (err) {
      res.status(500).json({ error: 'Login failed' });
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
