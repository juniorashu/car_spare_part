import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import ProductGallery from "./ProductGallery";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  // Convert image paths into public URLs
  const images = (product.image_path || []).map((path) => {
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
    
  });
  
  
  // chech if user is logged in

async function handleAddToCart(product) {
  // 1️⃣ Check if user is logged in
  const { data: session } = await supabase.auth.getUser();
  const user = session?.user;

  if (!user) {
    // 2️⃣ User NOT logged in → store in localStorage
    addToLocalCart(product);
    return;
  }



  // 3️⃣ User logged in → store in Supabase
  await addToCartDB(user.id, product.id);
}

function addToLocalCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    // Item already in cart → increase quantity
    cart[index].quantity += 1;
  } else {
    // Add new item
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image_path,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Saved to local cart", cart);
}

async function addToCartDB(userId, productId) {
  // Check if item already exists
  const { data: existing,  } = await supabase
    .from("cart")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  if (existing) {
    // Item exists → increase quantity
    const { error: updateError } = await supabase
      .from("cart")
      .update({ quantity: existing.quantity + 1 })
      .eq("id", existing.id);

    if (updateError) console.error(updateError);
    console.log("Quantity updated in cart");
    return;
  }

  // Item does not exist → create new entry
  const { error } = await supabase
    .from("cart")
    .insert({
      user_id: userId,
      product_id: productId,
      quantity: 1,
    });

  if (error) console.error(error);
  else console.log("Added to cart (DB)");
}


  return (
    <div className="product-detail-container">
      {/* Left Section: Image Gallery */}
      <div className="product-gallery-section">
        <p className="desc">
          {product.description ||
            "Durable and high-quality front brake disc compatible with Toyota Corolla 2014–2019 models. Designed for smooth braking performance and longer lifespan."}
        </p>
        <ProductGallery images={images} />
      </div>

      {/* Right Section: Product Info */}
      <div className="product-info">
        <h2>{product.name || "Front Brake Disc for Toyota Corolla"}</h2>
        <p className="brand">
          Brand: {product.brand || "Bosch"} | Part No: {product.part_number || "BDX-4521"}
        </p>

        <div className="price">
          <h3>Price: {product.price ? `FCFA ${product.price}` : "FCFA 45,000"}</h3>
          <p className="availability">
            Availability: <span>In Stock</span>
          </p>
        </div>

        

       
        <div className="customization">
          <h4>Product Details</h4>
          <ul>
          
            <li>Weight: {product.weight || "3.5 kg"}</li>
            <li>Origin: {product.origin || "China"}</li>
        
          </ul>
        </div>

        <div className="actions">
          <button className="add-to-carts" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          <button className="buy-now" >Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
