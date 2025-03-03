import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductListing from './components/ProductListing';
import ProductPage from './components/ProductPage'; 
import './App.css'
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductListing />} />
        {/* <Route path="/products/:productId/" element={<ProductPage />} /> */}
        <Route path="/products/:productId/" element={<ProductPage />} />
        {/* A catch-all route for invalid URLs */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/login" element={<Login />} /> {/* Add the login page */}
      </Routes>
    </Router>
  );
}



export default App
