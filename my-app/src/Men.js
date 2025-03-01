import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams to access URL params
import { CartContext } from './CartContext'; // Import CartContext to manage the cart
import './Men.css';  // Make sure this path is correct

const Men = () => {
  const { id } = useParams();  // Get the category ID from the URL
  const { cartItems, setCartItems } = useContext(CartContext); // Access cartItems and setCartItems from CartContext

  const [products, setProducts] = useState([]);  // State to store products

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/categories/${id}/products/`)
        .then(response => {
          setProducts(response.data);  // Store the fetched products in the state
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [id]);  // Run the effect when the category ID changes

  // Function to handle adding the product to the cart
  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems];
    const productIndex = updatedCart.findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      // If the product is already in the cart, increase its quantity
      updatedCart[productIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCart);  // Update the cart state
  };

  return (
    <div>
      <h1>Men's Collection</h1>
      <div className="collection-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="category-box" key={product.id}>
              <img
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.name}
                className="category-image"
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              {/* Add to Cart Button */}
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Men;
