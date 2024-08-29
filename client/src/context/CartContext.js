import React, { createContext, useState } from 'react';

export const CartContext = createContext();          

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);             

  const addToCart = (activity) => {                  
    setCart((prevCart) => {
      const existingActivity = prevCart.find((item) => item.id === activity.id);
      if (existingActivity) {
        return prevCart.map((item) =>
          item.id === activity.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...activity, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};