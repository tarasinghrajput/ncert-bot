import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProductListing from "./components/ProductListing";
import ProductPage from "./components/ProductPage";
import Login from "./components/Login";
import Signup from "./components/Signup";  // Import Signup component
import { useAuth } from "./contexts/authContext/AuthContext";

function App() {
    const { userLoggedIn } = useAuth();

    return (
        <Router>
            <Routes>
                {/* Redirect to login if not authenticated */}
                <Route path="/" element={userLoggedIn ? <LandingPage /> : <Navigate to="/login" />} />
                <Route path="/products" element={userLoggedIn ? <ProductListing /> : <Navigate to="/login" />} />
                <Route path="/products/:productId/" element={userLoggedIn ? <ProductPage /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />  {/* New Signup Route */}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;
