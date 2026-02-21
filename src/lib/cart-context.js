"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "seelensprache-cart";

function loadCart() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage voll oder nicht verfügbar
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Beim ersten Render aus localStorage laden
  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  // Bei Änderungen speichern
  useEffect(() => {
    if (hydrated) {
      saveCart(items);
    }
  }, [items, hydrated]);

  const addItem = useCallback((productId) => {
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    setItems((prev) => [...prev, { id, productId }]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.length;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, itemCount, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart muss innerhalb von CartProvider verwendet werden");
  }
  return context;
}
