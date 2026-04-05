import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CartItem } from "@/data/products";
import { siteConfig } from "@/config/site";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  promo: any | null;
  applyPromo: (code: string) => Promise<boolean>;
  discount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(siteConfig.cartStorageKey) || "[]");
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [promo, setPromo] = useState<any | null>(null);

  const applyPromo = async (code: string) => {
    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.promo) {
        setPromo(data.promo);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem(siteConfig.cartStorageKey, JSON.stringify(newCart));
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.cartId === item.cartId);
      let newCart;
      if (existing) {
        newCart = prev.map((c) =>
          c.cartId === item.cartId ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        newCart = [...prev, { ...item, quantity: 1 }];
      }
      localStorage.setItem(siteConfig.cartStorageKey, JSON.stringify(newCart));
      return newCart;
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setCart((prev) => {
      const newCart = prev.filter((c) => c.cartId !== cartId);
      localStorage.setItem(siteConfig.cartStorageKey, JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((cartId: string, delta: number) => {
    setCart((prev) => {
      const newCart = prev
        .map((c) =>
          c.cartId === cartId ? { ...c, quantity: c.quantity + delta } : c
        )
        .filter((c) => c.quantity > 0);
      localStorage.setItem(siteConfig.cartStorageKey, JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    saveCart([]);
    setPromo(null);
  }, [saveCart]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const discount = promo
    ? promo.type === "percentage"
      ? (total * promo.discount) / 100
      : promo.discount
    : 0;

  const finalTotal = Math.max(0, total - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        isOpen,
        setIsOpen,
        promo,
        applyPromo,
        discount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
