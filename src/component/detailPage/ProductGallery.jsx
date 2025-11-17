import React, { useState } from "react";
import "./ProductGallery.css";

const ProductGallery = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  if (images.length === 0) return <p>No images available</p>;

  return (
    <div className="gallery-container">
    

      {/* Thumbnail list */}
      <div className="thumbnail-list">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            className={`thumbnail ${mainImage === img ? "active" : ""}`}
            onMouseEnter={() => setMainImage(img)} // hover to change
            onClick={() => setMainImage(img)} // or click to change
          />
        ))}
      </div>
        {/* Main large image */}
      <div className="main-image">
        <img src={mainImage} alt="Main product" />
      </div>
    </div>
  );
};

export default ProductGallery;
