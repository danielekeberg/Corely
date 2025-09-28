import { useEffect, useState } from "react";

export function useCart() {
    const [cart, setCart] = useState<any[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if(storedCart) setCart(JSON.parse(storedCart));
        setLoaded(true);
    }, []);

    useEffect(() => {
        if(loaded) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, loaded]);

    function addToCart(item: any) {
        setCart((prev) => [...prev, item]);
    }

    function removeFromCart(id: number) {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }

    function setQuantity(id: string | number, qty: number) {
        setCart(prev => {
            if(qty <= 0) return prev.filter(it => it.id !== id);
            const i = prev.findIndex(it => it.id === id);
            if(i === 1) return [...prev, { id, quantity: qty }];
            const next = [...prev];
            next[i] = { ...next[i], quantity: qty};
            return next;
        })
    }

    function increment(id: string | number) {
        setQuantity(id, (cart.find(it => it.id === id)?.quantity ?? 0) + 1);
    }

    function decrement(id: string | number) {
        setQuantity(id, (cart.find(it => it.id === id)?.quantity ?? 0) - 1);
    }

    return { cart, addToCart, removeFromCart, setQuantity, increment, decrement };
}