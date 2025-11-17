import React, { useState } from "react";
import  supabase  from "../../lib/supabaseClient";  // ✅ Make sure this path is correct
import "./auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ Added success state

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {  error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Account created! Check your email to verify."); // ✅ Works now
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us and enjoy the experience</p>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>} {/* ✅ Show success */}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              required                      // ✅ Added
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Choose a strong password"
              value={password}
              required                      // ✅ Added
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn" type="submit">
            Create Account
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
