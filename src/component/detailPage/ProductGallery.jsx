import React, { useState } from "react";
import "./ProductGallery.css";

const ProductGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="gallery-container">
      <div className="thumbnail-list">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            className={`thumbnail ${mainImage === img ? "active" : ""}`}
            onMouseEnter={() => setMainImage(img)}
          />
        ))}
      </div>

      <div className="main-image">
        <img src={mainImage} alt="Main product" />
      </div>
    </div>
  );
};

export default ProductGallery;
