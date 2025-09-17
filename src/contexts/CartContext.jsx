import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { createCart, getCart, addLinesToCart, removeLinesFromCart } from '@/lib/shopify';

const CartContext = createContext();
const CART_ID_STORAGE_KEY = 'shopify-cart-id';

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const initializeCart = useCallback(async () => {
    setIsLoading(true);
    try {
      let cartId = localStorage.getItem(CART_ID_STORAGE_KEY);
      let currentCart = null;

      if (cartId) {
        currentCart = await getCart(cartId);
      }

      if (!currentCart) {
        currentCart = await createCart();
        localStorage.setItem(CART_ID_STORAGE_KEY, currentCart.id);
      }
      
      setCart(currentCart);
    } catch (error) {
      console.error("Fehler bei der Initialisierung des Warenkorbs:", error);
      localStorage.removeItem(CART_ID_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const addToCart = useCallback(async (variantId, quantity, customAttributes = []) => {
    if (!cart?.id) {
      console.error("Warenkorb nicht initialisiert.");
      return;
    }
    setIsUpdating(true);
    try {
      const lines = [{ merchandiseId: variantId, quantity, attributes: customAttributes }];
      const updatedCart = await addLinesToCart(cart.id, lines);
      setCart(updatedCart);
      setIsCartOpen(true);
    } catch (error) {
      console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
    } finally {
      setIsUpdating(false);
    }
  }, [cart?.id]);

  const removeFromCart = useCallback(async (lineId) => {
    if (!cart?.id) return;
    setIsUpdating(lineId);
    try {
      const updatedCart = await removeLinesFromCart(cart.id, [lineId]);
      setCart(updatedCart);
    } catch (error) {
      console.error("Fehler beim Entfernen aus dem Warenkorb:", error);
    } finally {
      setIsUpdating(false);
    }
  }, [cart?.id]);

  const clearCart = useCallback(async () => {
    if (!cart?.id || !cart.lines?.edges?.length) return;
    setIsUpdating(true);
    try {
      const lineIds = cart.lines.edges.map(edge => edge.node.id);
      const updatedCart = await removeLinesFromCart(cart.id, lineIds);
      setCart(updatedCart);
    } catch (error) {
      console.error("Fehler beim Leeren des Warenkorbs:", error);
    } finally {
      setIsUpdating(false);
    }
  }, [cart]);
  
  const checkout = useCallback(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  }, [cart?.checkoutUrl]);

  const value = useMemo(() => ({
    cart,
    isLoading,
    isUpdating,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    checkout
  }), [cart, isLoading, isUpdating, isCartOpen, addToCart, removeFromCart, clearCart, checkout]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};