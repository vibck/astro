"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { getProduct } from "@/lib/products";
import { Button } from "@/components/ui/button";

export function CartSidebar() {
  const { items, removeItem, clearCart, isOpen, setIsOpen, itemCount } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const panelRef = useRef(null);

  // ESC zum Schließen
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, setIsOpen]);

  // Summe berechnen
  const total = items.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0);
  }, 0);

  async function handleCheckout() {
    if (items.length === 0) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => i.productId) }),
      });
      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col bg-white/95 backdrop-blur-xl border-l border-rose-light/15 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-rose-light/10">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Warenkorb
              {itemCount > 0 && (
                <span className="ml-2 text-sm font-normal text-earth">({itemCount})</span>
              )}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-rose-light/10 transition-colors"
              aria-label="Schließen"
            >
              <svg className="h-5 w-5 text-earth" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg className="h-16 w-16 text-rose-light/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <p className="text-earth">Dein Warenkorb ist leer</p>
                <p className="text-sm text-earth/60 mt-1">Entdecke unsere Readings und füge sie hinzu.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <li key={item.id} className="flex items-center gap-4 rounded-2xl p-4 glass-warm">
                      <div className="flex-1 min-w-0">
                        <p className="font-serif font-semibold text-foreground truncate">{product.name}</p>
                        <p className="text-xs text-earth">{product.subtitle}</p>
                      </div>
                      <p className="font-serif font-bold text-gold whitespace-nowrap">{product.priceDisplay}€</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full hover:bg-rose-light/15 transition-colors"
                        aria-label={`${product.name} entfernen`}
                      >
                        <svg className="h-4 w-4 text-earth" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-rose-light/10 px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-earth font-medium">Gesamt</span>
                <span className="font-serif text-2xl font-bold text-gradient-warm">
                  {(total / 100).toFixed(0)}€
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full rounded-full bg-gold text-white hover:bg-gold-light glow-gold-warm text-base py-6"
              >
                {checkoutLoading ? "Wird geladen..." : "Zur Kasse"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
