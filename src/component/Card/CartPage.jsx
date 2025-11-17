import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "./CartPage.css";
import supabase from "../../lib/supabaseClient";

const CartPage = () => {
  const [items, setItems] = useState([ ]);

useEffect(() => {
const datas = async () => {
  const { data, error } = await supabase
  .from('cart')
  .select(`
    id,
    quantity,
    products (
      name,
      description,
      price,
      image_path
    )
  `);
  
  if (error) console.error('Error fetching cart data:', error);
  else setItems(data);
};
datas();

}, []);

  // 🔹 Increase quantity
  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  //subtotal calculation
  const subtotal = items.reduce(
  (total, item) => total + item.quantity * item.products.price,
  0
);


  // 🔹 Decrease quantity (min = 1)
  const decreaseQty = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 🔹 Delete item
  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };




  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      <div className="cart-container">

        <div className="cart-list">
          {items.map((item) => (
           <CartItem
  key={item.id}
  id={item.id}
  quantity={item.quantity}
  title={item.products.name}
  description={item.products.description}
  price={item.products.price}
  image={item.products.image_path}
  increaseQty={() => increaseQty(item.id)}
  decreaseQty={() => decreaseQty(item.id)}
  deleteItem={() => deleteItem(item.id)}
/>

          ))}
        </div>

        <div className="cart-summary">
          <p>
            Subtotal ({items.length} items):{" "}
           <strong>XAF {subtotal.toLocaleString()}</strong>

          </p>
          <button className="checkout-btn">Proceed to checkout</button>
        </div>

      </div>
    </div>
  );
};

export default CartPage;

