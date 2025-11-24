import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // optional if you want password check
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    // Sign in via Supabase Auth
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError || !data?.user) {
      throw new Error(signInError?.message || "Invalid email or password.");
    }

    const userId = data.user.id;

    // Check if user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("id", userId)
      .single();

    if (adminError || !adminData) {
      throw new Error("Access denied. Not an admin user.");
    }

    setMessage("✅ Login successful! Redirecting...");
    setTimeout(() => {
      navigate("/admin/upload");
    }, 1000);
  } catch (error) {
    setMessage("❌ " + error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🔐 Admin Login</h2>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
