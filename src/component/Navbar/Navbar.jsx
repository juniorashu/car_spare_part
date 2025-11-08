// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ searchTerm, setSearchTerm }) {
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

        <button className="icon-btn">👤</button>
        <button className="icon-btn">
          🛒<span className="cart-count">0</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
