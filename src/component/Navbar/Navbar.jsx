// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import supabase from "../../lib/supabaseClient";

function Navbar({ searchTerm, setSearchTerm }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 Check user immediately on mount
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };

    checkUser();

    // 🔥 Listen to login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setIsLoggedIn(true);   // user logged in
        } else {
          setIsLoggedIn(false);  // user logged out
        }
      }
    );

    // cleanup listener
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <span>🛒</span> AUTOPARTS PRO
        </Link>
        <small>Performance • Precision</small>
      </div>

      <div className="search-area">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-red">Search</button>
      </div>

      <nav className="nav-links">
        <Link to="/shop" className="nav-item">Shop</Link>
        <Link to="/cart" className="nav-item">Orders</Link>
        <Link to="/adminLogin" className="nav-item">Admin</Link>

        {/* 🔥 Switch between Login and Logout */}
        {isLoggedIn ? (
          <Link
            to="/"
            className="nav-item"
            onClick={async () => {
              await supabase.auth.signOut();
            }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" className="nav-item">
            
             Signup
          </Link>
        )}

        <button className="icon-btn">👤</button>
        <button className="icon-btn">
          🛒 <span className="cart-count">0</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
