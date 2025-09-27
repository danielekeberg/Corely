'use client';

import Link from "next/link";
import { useCart } from "./useCart";
import { useCartContext } from "./CartContext";

function Header() {
    // const { cart } = useCart();
    // const cartQuantity = cart.length;
    const { cart } = useCartContext();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div className="flex p-4 border-b border-gray-300 items-center justify-between px-60 py-6">
            <Link href="../">
                <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-500 transition-colors duration-150">CORELY</h1>
            </Link>
            <div className="gap-10 flex">
                <Link href="../" className="text-lg hover:text-blue-500 transition-colors duration-150">Products</Link>
                <Link href="../contact" className="text-lg hover:text-blue-500 transition-colors duration-150">Contact</Link>
            </div>
            <Link href="../cart" className="relative">
                <img src="/icons/cart.svg" alt="Cart Icon" className="w-8 h-8 cursor-pointer" />
                { totalItems > 0 && (
                    <span className="absolute top-0 right-0 translate-x-3 -translate-y-3 bg-red-600 rounded-full px-2 text-white text-sm py-0.5">{totalItems}</span>
                )}
            </Link>
        </div>
    )
}

export default Header;