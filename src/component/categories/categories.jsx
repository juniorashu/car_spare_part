// src/components/Categories.jsx
import React, { useState } from "react";
import "./Categories.css"; // styles for category menu

function Categories({
  categories,
  brands,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  selectedCategory,
  setSelectedCategory,
}) {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => setOpen((v) => !v);

  const handleSelect = (cat) => {
    setSelectedCategory && setSelectedCategory(cat);
    setOpen(false);
  };

  return (
    <aside className={`filters categories ${open ? "open" : "closed"}`}>
      <div className="menu-header">
        <button className="menu-toggle" onClick={toggleOpen} aria-expanded={open}>
          ☰ Categories {selectedCategory ? `· ${selectedCategory}` : ''}
        </button>
      </div>

      {open && (
        <div className="menu-body">
          <div>
            <strong>Category</strong>
            <div className="btn-group vertical">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleSelect(cat)}
                >
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

          <div className="menu-actions">
            <button className="btn-red" onClick={() => setOpen(false)}>Close</button>
            <button className="btn-reset">Reset</button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Categories;
