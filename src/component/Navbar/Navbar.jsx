// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css"; // reuse same styles if needed

function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <header className="header">
      <div className="logo">
        <span>🛒</span> AUTOPARTS PRO
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

      <nav>
        <a href="#shop">Shop</a>
        <a href="#orders">Orders</a>
        <a href="#admin">Admin</a>
        <button className="icon-btn">👤</button>
        <button className="icon-btn">
          🛒<span className="cart-count">0</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
