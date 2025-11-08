import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./component/ProductList/productList.jsx";
import CartPage from "./component/Card/CartPage.jsx";
import Navbar from "./component/Navbar/Navbar.jsx";
import AdminUpload from "./component/Upload/AdminUpload.jsx";
import AdminLogin from "./component/Admin Longin and signin/AdminLogin.jsx";
import ProductDetails from "./component/detailPage/ProductDetail.jsx";

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: "#111",
          color: "#fff",
        }}
      > 

      
        <Navbar />
      </nav>

      <Routes>
        
        <Route path="/" element={<LandingPage onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} onRemoveFromCart={handleRemoveFromCart} /> } />
        <Route path="/admin/upload" element={<AdminUpload />} />
        <Route path="adminLogin" element={<AdminLogin />} />
         <Route path="*" element={<AdminLogin />} /> 
         <Route path="/Product/:id" element={<ProductDetails />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
