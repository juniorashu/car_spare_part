import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  if (!product) return <p>Loading product...</p>;

  // Convert image paths into public URLs
  const images = (product.image_path || []).map((path) => {
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  });

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <ProductGallery images={images} />
      <p>{product.description}</p>
      <strong>Price: ${product.price}</strong>
    </div>
  );
};

export default ProductDetail;
