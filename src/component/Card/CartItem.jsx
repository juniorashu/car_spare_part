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
  async function deleteItemDB(id) {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", id);

    if (!error) deleteItem();
     console.log(id);
  }
 
  
  return (
   <div className="cart-item">
  

    <p className="cart-description">{description}</p>

    {imageUrl && (
      <img
        src={imageUrl}
        alt={title}
        className="cart-item-image"
      />
    )}


  <div className="cart-item-info">
    <h3>{title}</h3>
    <span className="cart-item-price">{price}</span>
  </div>

  <div className="quantity-control">
    <button onClick={decreaseQuantityDB} className="qty-btn">−</button>
    <span className="qty-display">{quantity}</span>
    <button onClick={increaseQuantityDB} className="qty-btn">+</button>
  </div>

  <button className="delete-icon" onClick={() =>deleteItemDB(id)}>🗑</button>
</div>

  );
};

export default CartItem;
