import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AddDonor from './pages/AddDonor';
import AddReceiver from './pages/AddReceiver';
import './index.css';

const ProtectedRoute = ({ children, session }) => {
  if (!session) {
    return <Navigate to="/auth" />;
  }
  return children;
};

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="app loading-spinner">Loading FoodShare...</div>;
  }

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/dashboard" />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute session={session}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/add-donor" element={
            <ProtectedRoute session={session}>
              <AddDonor />
            </ProtectedRoute>
          } />
          
          <Route path="/add-receiver" element={
            <ProtectedRoute session={session}>
              <AddReceiver />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
