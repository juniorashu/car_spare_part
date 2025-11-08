import React, { useEffect, useState, } from "react";
import supabase from "../../lib/supabaseClient";
import "./productList.css";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);

  };
  console.log(products);
  
  return (
  
  <div className="product-list-container">
      <h2>🧰 Spare Parts</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              {product.image_url && (
                <img src={product.image_url} alt={product.name} />
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>${product.price}</strong>
              <button className="add-to-cart-btn" onClick={() =>handleViewDetails(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
