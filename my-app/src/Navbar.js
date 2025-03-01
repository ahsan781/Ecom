import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext'; // Import CartContext
import axios from 'axios';  // Import axios for API requests

function Navbar() {
  const { cartItems } = useContext(CartContext); // Get cartItems from context
  const [categories, setCategories] = useState([]);  // State to store categories

  // Fetch categories from the API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        setCategories(response.data);  // Set categories from API response
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);  // Empty array ensures this effect runs only once when the component mounts

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontWeight: "bold", letterSpacing: "2px" }}>ＥＳＤＲＯ</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Hot" style={{ color: "black" }}>Hot Selling</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/Men">MEN</Link>
            </li> */}
            
            {/* Dropdown for categories */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* Map through categories to create dropdown items */}
                {categories.map(category => (
                  <li key={category.id}>
                    <Link className="dropdown-item" to={`/category/${category.id}`}>
                      {category.name}  {/* Display category name */}
                    </Link>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                {/* Additional static items can go here */}
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="navbar-icons">  {/* Always visible basket icon */}
          <Link to="/basket" className="nav-icon">
            <i className="fas fa-shopping-cart"></i>
            {/* Display cart count */}
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span> /* Show the cart count next to the icon */
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
