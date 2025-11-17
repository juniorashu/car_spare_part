import React from "react";
import "./CartItem.css";
import supabase from "../../lib/supabaseClient";

const CartItem = ({
  id,
  title,
  description,
  price,
  image,
  quantity,
  increaseQty,
  decreaseQty,
  deleteItem
}) => {
// fetch supabase public image url

const getPublicUrl = (path) => {
  const { data, error } = supabase.storage
    .from("product-images")  // ✔️ correct bucket name
    .getPublicUrl(path);

  if (error) {
    console.error("URL error:", error);
    return null;
  }
  return data.publicUrl;
};
const imageUrl = image && image.length > 0 ? getPublicUrl(image[0]) : null;
  // 🔥 Increase quantity in Supabase
  async function increaseQuantityDB() {
    const { error } = await supabase
      .from("cart")
      .update({ quantity: quantity + 1 })
      .eq("id", id);

    if (!error) increaseQty(); // update UI
  }
  // 🔥 Decrease quantity in Supabase
  async function decreaseQuantityDB() {
    if (quantity <= 1) {
      deleteItemDB();
      return;
    }

    const { error } = await supabase
      .from("cart")
      .update({ quantity: quantity - 1 })
      .eq("id", id);

    if (!error) decreaseQty();
  }
  // 🔥 Delete item from Supabase
  async function deleteItemDB() {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", id);

    if (!error) deleteItem();
  }
  return (
    <div className="cart-item">
      
      {/* Product Image */}
{imageUrl && (
  <img
    src={imageUrl}
    alt={title}
    className="cart-item-image"
  />
)}
      {/* Product Details */}
      <div className="cart-item-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="cart-item-price">{price}</span>
      </div>

      {/* Quantity Selector */}
      <div className="quantity-control">
        <button onClick={decreaseQuantityDB} className="qty-btn">−</button>
        <span className="qty-display">{quantity}</span>
        <button onClick={increaseQuantityDB} className="qty-btn">+</button>
      </div>

      {/* Delete Icon */}
      <button className="delete-icon" onClick={deleteItemDB}>
        🗑
      </button>
    </div>
  );
};

export default CartItem;
