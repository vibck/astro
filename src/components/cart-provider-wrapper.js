"use client";

import { CartProvider } from "@/lib/cart-context";
import { CartSidebar } from "@/components/cart-sidebar";

export function CartProviderWrapper({ children }) {
  return (
    <CartProvider>
      {children}
      <CartSidebar />
    </CartProvider>
  );
}
