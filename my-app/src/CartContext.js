import React, { createContext, useState } from 'react';

// Create the context
export const CartContext = createContext();

// Provide the context to components
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add a product to the cart
  const addToCart = (item) => {
    const existingProduct = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingProduct) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
