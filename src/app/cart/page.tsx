'use client';

import Header from "../Header";
import Section from "../Section";
import Link from "next/link";
import { useCart } from "../useCart";
import { useEffect, useState } from "react";
import Toast from "../Toast";

function App() {
    const { cart, removeFromCart } = useCart();
    const checkCart = cart.length;
    const [cartItems, setCartItems] = useState(cart);
    const [show, setShowToast] = useState(false);

    useEffect(() => {
        async function fetchCartItems() {
            const items = await Promise.all(cart.map(async (item) => {
                const res = await fetch(`https://v2.api.noroff.dev/online-shop/${item.id}`, {
                    cache: 'no-store',
                });
                const data = await res.json();
                return { ...data.data, quantity: item.quantity };
            }));
            setCartItems(items);
        }
        fetchCartItems();
    }, [cart]);
    const total = cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);

    useEffect(() => {
        if(!show) return;
        const timer = setTimeout(() => {
            setShowToast(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [show]);

    return (
        <div>
            <Header />
            { show && (
                <Toast type="success" message="Item removed from cart" />
            )}
            { checkCart === 0 ?(
                <div>
                    <Section title="Your Cart is Empty" desc="Looks like you haven't added any items to your cart yet." />
                    <div className="flex justify-center">
                        <Link href="../" className="bg-blue-500 border border-gray-500 text-white cursor-pointer font-bold mt-6 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-150 mx-60">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="px-60 py-10">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
                <div className="flex gap-15 mt-10">
                    <div className="w-2/3">
                        <div className="grid grid-cols-5 gap-4 border-b border-gray-300 py-2 font-semibold">
                            <div>Product</div>
                            <div className="col-span-2">Details</div>
                            <div>Quantity</div>
                            <div>Price</div>
                        </div>
                        <div className="grid grid-cols-5 gap-4 items-center border-b border-gray-300 py-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="contents"> 
                                    <div>
                                        <img src={item.image.url} alt={item.image.alt} className="w-20 h-20 object-cover" />
                                    </div>
                                    <div className="col-span-2">
                                        <Link href={`../product/${item.id}`} className="font-semibold hover:underline">{item.title}</Link>
                                        <p className="text-gray-500 text-sm">{item.description}</p>
                                        <button 
                                            className="text-red-600 text-sm mt-2 hover:underline cursor-pointer"
                                            onClick={() => {
                                                removeFromCart(item.id);
                                                setShowToast(true);
                                            }}>
                                            Remove
                                        </button>
                                    </div>
                                    <div className="border border-gray-400 w-1/3 rounded px-2 h-10 flex justify-center items-center overflow-hidden">
                                        <span className="text-center align-middle">{item.quantity}</span>
                                    </div>
                                    <div className="font-semibold">${(item.discountedPrice * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                        <div className="border border-gray-300 w-1/3 p-4 rounded max-h-63">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg border-t border-gray-300 pt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Link href="../checkout/">
                                <button onClick={() => localStorage.removeItem('cart')}
                                    className="bg-blue-500 border border-gray-500 text-white w-full cursor-pointer font-bold mt-6 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-150">
                                    Proceed to Checkout
                                </button>
                            </Link>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default App;