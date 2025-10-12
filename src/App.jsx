import React, { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import Categories from "./component/categories/categories";

const brands = ["TorqueX", "Bosca", "Lumina", "GripMax", "SteelCore", "AutoStyle"];
const categories = ["Engine", "Brakes", "Lighting", "Tires", "Accessories"];

const products = [
  {
    id: 1,
    title: "Bosca Ceramic Brake Pads",
    brand: "Bosca",
    category: "Brakes",
    price: 89.0,
  },
  {
    id: 2,
    title: "Bosca Drilled Brake Rotors",
    brand: "Bosca",
    category: "Brakes",
    price: 199.0,
  },
];

function App() {
  const [bgBlack, setBgBlack] = useState(true);
  const [searchTerm, setSearchTerm] = useState("Bosca");
  const [priceRange, setPriceRange] = useState({ min: 15, max: 199 });
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggleBackground = () => setBgBlack((prev) => !prev);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      p.price >= priceRange.min &&
      p.price <= priceRange.max
  );

  return (
    <div className={`app ${bgBlack ? "dark-bg" : "light-bg"}`}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="main-content">
      <Categories
          categories={categories}
          brands={brands}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
        />

        <section className="products">
         <h3>
            Products <small>{filteredProducts.length} results for “{searchTerm}”</small>
          </h3>

          <div className="product-list">
            {filteredProducts.map((p) => (
              <div className="product-card" key={p.id}>
                <div className="product-image">
                  <div className="circle-chart"></div>
                </div>
                <div className="product-info">
                  <h4>{p.title}</h4>
                  <small>
                    {p.brand} • {p.category}
                  </small>
                  <div className="product-actions">
                    <span className="price">${p.price.toFixed(2)}</span>
                    <button className="btn-view">View</button>
                    <button className="btn-red">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button disabled>Prev</button>
            <button className="btn-red">1</button>
            <button disabled>Next</button>
          </div>
        </section>
      </main>

      <footer>
        <button onClick={toggleBackground} className="btn-switch-bg">
          Switch to {bgBlack ? "Light" : "Dark"} Background
        </button>
      </footer>
    </div>
  );
}

export default App;
