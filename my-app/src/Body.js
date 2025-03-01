import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios for API requests
import { Link } from 'react-router-dom';
import './Body.css';
import { FaArrowRight } from 'react-icons/fa';
import './CategorySection.css';
import women from './img/women.png';

function Body() {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [sliders, setSliders] = useState([]); // State for storing slider data
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch categories and products from the Django API
  useEffect(() => {
    // Fetch categories
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        setCategories(response.data);  // Store categories

        // Fetch products for each category based on the category_id
        response.data.forEach(category => {
          axios.get(`http://127.0.0.1:8000/api/categories/${category.id}/products/`)
            .then(productResponse => {
              setProductsByCategory(prevState => ({
                ...prevState,
                [category.id]: productResponse.data  // Store products by category ID
              }));
            })
            .catch(error => {
              console.error(`Error fetching products for category ${category.id}:`, error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Fetch slider images dynamically
    axios.get('http://127.0.0.1:8000/api/sliders/')
      .then(response => {
        setSliders(response.data); // Store slider images and names
      })
      .catch(error => {
        console.error('Error fetching sliders:', error);
      });

    // Automatically slide images every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    }, 3000); // Update timing to 3 seconds for slider transition
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [sliders.length]); // Re-run when sliders data is fetched

  return (
    <div className="body-container">
      {/* Image Carousel */}
      <div className="carousel-container">
        <div
          className="carousel-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sliders.map((slider, index) => (
            <div key={slider.id} className="carousel-image-container">
              <img
                src={`http://127.0.0.1:8000${slider.image}`}  // Dynamically load images from the server
                alt={`Slider ${slider.name}`}
                className="carousel-image"
              />
            </div>
          ))}
        </div>

        {/* Dots for navigation */}
        <div className="carousel-dots">
          {sliders.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      <div>
        <h1 className="ff">ESDRO OFFICIAL STORE</h1>
        <p className="ss">
          We deliver your watch with 1-year machine warranty and branded packaging.<br />
          We guarantee that your shopping experience will be great with us.<br />
          We offer you the best quality at the best prices.
        </p>
      </div>

      {/* Category Section */}
      <div className="category-section">
        <h1 className="category-title">TOP CATEGORIES</h1>
        <div className="category-boxes">
          {categories.map((category) => (
            <div key={category.id} className="category-box">
              <img
                src={category.image ? `http://127.0.0.1:8000${category.image}` : women}
                alt={`Category ${category.name}`}
                className="category-image"
              />
              <p className="category-text">{category.name}</p>
              <FaArrowRight className="arrow-icon" />
            </div>
          ))}
        </div>
      </div>

      {/* Display products by category */}
      {categories.map((category) => (
        <section key={category.id} className={`${category.name.toLowerCase()}-collection`}>
          <div className="collection-content">
            <h2>{category.name} Collection</h2>
            <div className="collection-grid">
              {/* Render products for this category */}
              {productsByCategory[category.id] && productsByCategory[category.id].length > 0 ? (
                productsByCategory[category.id].map((product) => (
                  <div  className="category-box" key={product.id}>
                    <img
                      src={`http://127.0.0.1:8000${product.image}`}
                      alt={product.name}
                      className="category-image"
                    
                    />
                    
                    {/* <img
                      src={`http://127.0.0.1:8000${product.image}`}  // Hover image placeholder
                      alt={`Hover image for ${product.name}`}
                      className="hover-img"
                    /> */}
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>

                    {/* Link to Product Page with the product ID */}
                    <Link to={`/product/${product.id}`} className="add-to-cart">
                      View Product
                    </Link>
                  </div>
                ))
              ) : (
                <p>No products available in this category.</p>
              )}
            </div>
            <button className="view-all">View All</button>
          </div>
        </section>
      ))}

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/+923022994771"  // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon"
      >
        <i className="fab fa-whatsapp"></i> {/* Font Awesome WhatsApp icon */}
      </a>
    </div>
  );
}

export default Body;
