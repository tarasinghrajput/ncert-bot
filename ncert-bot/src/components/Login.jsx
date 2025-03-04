import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/"); // Redirect to home after login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: "10px", marginBottom: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc" }}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: "10px", marginBottom: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc" }}
                    required
                />
                <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Login
                </button>
            </form>
            <p style={{ marginTop: "10px" }}>
                Don't have an account? <a href="/signup" style={{ color: "#007bff", textDecoration: "none" }}>Sign up here</a>
            </p>
        </div>
    );
}

export default Login;
