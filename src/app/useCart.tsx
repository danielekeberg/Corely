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

    return { cart, addToCart, removeFromCart };
}