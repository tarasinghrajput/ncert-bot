import React, { useState } from "react";
import { auth, analytics } from "../firebaseConfig"; // 🔹 Import analytics
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { logEvent } from "firebase/analytics"; // 🔹 Import logEvent

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        // Sign Up with Firebase
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup Successful! Please log in.");
        setIsSignup(false); // Switch to login after signup

        // 🔹 Log signup event
        logEvent(analytics, "sign_up", { method: "email" });
      } else {
        // Log In with Firebase
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");

        // 🔹 Log login event
        logEvent(analytics, "login", { method: "email" });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleAuth}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button  onClick={() => setIsSignup(!isSignup)}  className="text-blue-500 hover:underline ml-1">
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
