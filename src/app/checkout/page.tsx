'use client';

import Header from "../Header";
import Link from "next/link";
import Toast from "../Toast";
import { useState, useEffect } from "react";

function App() {
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center text-center px-60 py-10 gap-6">
                <img src="/icons/checkout.svg" alt="Checkout" className="h-15 w-full" />
                <h1 className="text-3xl font-bold">Order Confirmed!</h1>
                <span className="text-gray-500">
                    Thank you for your purchace, Your order has been successfully placed and will be processed shortly.
                </span>

                <div className="flex flex-col mt-6 w-full max-w-md gap-4">
                    <p>What's next?</p>
                    <ul className="text-gray-500 list-disc list-inside space-y-2">
                        <li>You'll receive an email confirmation shortly</li>
                        <li>Your order will be processed within 1-2 business days.</li>
                        <li>Shipping typically takes 3-5 business days.</li>
                    </ul>
                </div>

                <div className="mt-5 flex flex-col w-1/3">
                    <Link
                        href="../" className="bg-blue-500 border border-gray-500 text-white cursor-pointer mt-6 px-4 py-2 hover:bg-blue-600 transition-colors duration-150">
                        Continue Shopping
                    </Link>
                    <Link href="../contact/" className="border border-gray-500 cursor-pointer mt-6 px-4 py-2 hover:bg-blue-600 hover:text-white transition-colors transition-text duration-150">
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default App;