import React, { useEffect, useState } from "react";
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

  return (
    <div className="product-list-container">
      <h2>🧰 Spare Parts</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => {
            // ✅ Get the first main image
            const mainImage =
              Array.isArray(product.image_urls) && product.image_urls.length > 0
                ? product.image_urls[0]
                : "https://via.placeholder.com/300x180?text=No+Image";

            return (
              <div className="product-card" key={product.id}>
                <img src={mainImage} alt={product.name || "Product"} />
                <h3>{product.name}</h3>
                
                <strong>${product.price}</strong>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleViewDetails(product)}
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
