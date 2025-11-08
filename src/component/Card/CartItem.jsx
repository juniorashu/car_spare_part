// src/components/CartItem.js
import React from "react";
import "./CartItem.css";

const CartItem = ({ title, price, description, image }) => {
  return (
    <div className="cart-item">
      <img src={image} alt={title} className="product-image" />
      <div className="item-details">
        <h3 className="item-title">{title}</h3>
        <p className="item-description">{description}</p>
        <p className="item-price">{price}</p>
        <div className="item-actions">
          <button>Delete</button>
          <button>Save for later</button>
          <button>Compare</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
