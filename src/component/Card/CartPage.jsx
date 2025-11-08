// src/components/CartPage.js
import React from "react";
import CartItem from "./CartItem";
import "./CartPage.css";

const CartPage = () => {
  const items = [
    {
      id: 1,
      title: "Ankey Display Port to VGA Adapter (4 Pack)",
      description:
        "Gold-plated DisplayPort DP to VGA Converter for Computer, Desktop, Laptop, PC, Monitor, Projector, HDTV",
      price: "XAF 8,601",
      image: "/images/img7.jpg" // 🔸 Add your image link here
    },
    {
      id: 2,
      title: "Amazon Basics DisplayPort to HDMI Cable",
      description: "4K@30Hz, 1920x1200, 6ft, Black (#1 Best Seller)",
      price: "XAF 6,855",
      image: "/images/img4.jpg" // 🔸 Add your image link here
    },
    {
      id: 3,
      title: "Dell OptiPlex 7050 Desktop Computer PC",
      description:
        "Intel Core i5 7500, 16GB DDR4 RAM, 1TB SSD, Windows 11 Pro, 4K Support HD Graphics 630",
      price: "XAF 139,031",
      image: "/images/img2.jpg" // 🔸 Add your image link here
    }
  ];

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      <div className="cart-container">
        {/* Left side: product list */}
        <div className="cart-list">
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        {/* Right side: subtotal box */}
        <div className="cart-summary">
          <p>
            Subtotal ({items.length} items):{" "}
            <strong>XAF 154,487</strong>
          </p>
          <button className="checkout-btn">Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
