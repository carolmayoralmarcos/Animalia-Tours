import React, { createContext, useState } from 'react';

export const CartContext = createContext();          

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);             

  const addToCart = (activity) => {                  
    setCart((prevCart) => {
      const existingActivity = prevCart.find((item) => item._id === activity._id);
      if (existingActivity) {
        return prevCart.map((item) =>
          item._id === activity._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...activity, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (indexToRemove, quantityToRemove = 1) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const item = newCart[indexToRemove];

      if (item.quantity > quantityToRemove) {
        item.quantity -= quantityToRemove;
      } else {
        newCart.splice(indexToRemove, 1);
      }

      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};