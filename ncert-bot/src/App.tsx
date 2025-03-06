// import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from "./components/LandingPage";
import ProductListing from "./components/ProductListing";
import ProductPage from "./components/ProductPage";
import Login from "./components/Login";
import Profile from "./components/Profile"
import { useAuth } from './contexts/authContext/AuthContext';
import './App.css'
import Signup from "./components/Signup";  // Import Signup component
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import Checkout from "./components/Checkout";
import Plans from "./components/Plans";
import ProductListing1 from "./components/ProductListing1";

function App() {
    const { userLoggedIn } = useAuth();

    return (
        <Router>
            <Routes>
                {/* Redirect to login if not authenticated */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/success" element={<PaymentSuccess />} />
                <Route path="/failed" element={<PaymentFailed />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/products" element={userLoggedIn ? <ProductListing /> : <Navigate to="/login" />} />
                    <Route path="/products/:productId/" element={userLoggedIn ? <ProductPage /> : <Navigate to="/login" />} />
                </Route>


                <Route path="/" element={<LandingPage />} /> {/* Default Route */}
                <Route path="*" element={<div>404 Not Found</div>} />
                
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/" element={<Plans />} />
                <Route path="/product-listing-1" element={<ProductListing1 />} />

            </Routes>
            
        </Router>
    );
}

export default App;
