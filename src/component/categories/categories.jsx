// src/components/Categories.jsx
import React from "react";
import "./Categories.css"; // optional custom CSS file if needed

function Categories({
  categories,
  brands,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
}) {
  return (
    <aside className="filters">
      <h3>Categories</h3>

      <div>
        <strong>Category</strong>
        <div className="btn-group">
          {categories.map((cat) => (
            <button key={cat} className="filter-btn">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <strong>Brand</strong>
        <div className="btn-group">
          {brands.map((brand) => (
            <button key={brand} className="filter-btn">
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div>
        <strong>Price range</strong>
        <div className="price-inputs">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((p) => ({ ...p, min: Number(e.target.value) }))
            }
            min="0"
          />
          <span>—</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((p) => ({ ...p, max: Number(e.target.value) }))
            }
            min="0"
          />
        </div>
      </div>

      <div className="checkbox-wrapper">
        <input
          id="stockOnly"
          type="checkbox"
          checked={inStockOnly}
          onChange={() => setInStockOnly(!inStockOnly)}
        />
        <label htmlFor="stockOnly">In stock only</label>
      </div>

      <div>
        <button className="btn-red">Apply</button>
        <button className="btn-reset">Reset</button>
      </div>
    </aside>
  );
}

export default Categories;
