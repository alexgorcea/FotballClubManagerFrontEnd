import { createContext, useContext, useState } from 'react';
import axios from '../api/axiosConfig';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (matchId, tribune, quantity, price) => {
    const item = {
      matchId,
      tribune,
      quantity,
      price,
      total: price * quantity
    };
    setCart(prev => [...prev, item]);
    console.log("Adăugat în coș:", item);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const checkoutCart = async () => {
    try {
      for (const item of cart) {
        await axios.post('/tickets/buy', {
          matchId: item.matchId,
          seat: item.tribune,
          quantity: item.quantity,
          price: item.price
        });
      }
      clearCart();
      alert("Biletele au fost cumpărate!");
    } catch (error) {
      console.error("Eroare la cumpărare bilete:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, checkoutCart }}>
      {children}
    </CartContext.Provider>
  );
}
