import { useState } from "react";
import { auth } from "../firebase/firebase"; // Ensure Firebase is correctly imported
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/"); // Redirect to home after signup
        } catch (error) {
            let errorMessage = "An unknown error occurred";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            // For Firebase specific errors
            if (typeof error === 'object' && error !== null && 'code' in error) {
                errorMessage = `Firebase Error: ${error.code}`;
            }

            console.error("Signup failed:", errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Signup</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
}

export default Signup;
