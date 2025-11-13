import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import ProductGallery from "./ProductGallery"; // optional

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
    return;
  }

  // Convert every Supabase path to public URL
  const urls = data.image_urls.map((path) => {
    const { data: publicData } = supabase.storage
      .from("product-images")
      .getPublicUrl(path);
    return publicData.publicUrl;
  });

  data.image_urls = urls;
  setProduct(data);
};




    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <ProductGallery images={[product.image_urls]} />
      <p>{product.description}</p>
      <strong>Price: ${product.price}</strong>
    </div>
  );
};

export default ProductDetail;
