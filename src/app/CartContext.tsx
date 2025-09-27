'use client';

import { createContext, useContext } from "react";
import { useCart } from "./useCart";

type CartContextType = ReturnType<typeof useCart>;

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const cartState = useCart();
    return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
}

export function useCartContext() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCartContext must be used inside CartProvider");
    return ctx;
}