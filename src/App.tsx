import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CropSuggestionPage } from './pages/CropSuggestionPage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { TipsLibraryPage } from './pages/TipsLibraryPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { ScanPage } from './pages/ScanPage';
import SearchPage from './pages/SearchPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
        {/* Redirect root to dashboard (will check auth in real world) or login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected User Routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/crop-suggestion" element={<CropSuggestionPage />} />
          <Route path="/market" element={<MarketPricesPage />} />
          <Route path="/tips" element={<TipsLibraryPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/gardening" element={<TipsLibraryPage />} />
          <Route path="/livestock" element={<TipsLibraryPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/security" element={<UserProfilePage />} />
          <Route path="/payment-status" element={<UserProfilePage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardPage />} />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
