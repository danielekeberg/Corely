'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch('https://v2.api.noroff.dev/online-shop');
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                const prod = data.data;
                setProducts(prod);
                console.log(prod);
                console.log(data);
            } catch (error) {
                setLoading(true);
                setError(true);
            } finally { 
                setLoading(false);
            }
            
        }
        getData()
    }, []);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error..</p>;

    return (
        <div className="px-60 grid grid-cols-4 gap-6 mb-10">
            {products.map((product) => (
                <Link href={`./product/${product.id}`} className="bg-white border border-gray-300 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors duration-150" key={product.id}>
                    <div className="relative overflow-hidden">
                        <img src={product.image.url} alt={product.image.alt} className="w-full border-b border-gray-300 h-70 object-cover hover:scale-105 transition-transform duration-150" />
                        {product.discountedPrice < product.price ? (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-{((product.price - product.discountedPrice) / product.price * 100).toFixed(0)}%</span>
                        ) : null}
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-left mb-2">
                            {product.title}
                        </h3>
                        <div className="flex items-center mb-2">
                            <div className="flex items-center">
                                <img src="/icons/star.svg" alt="Star" className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-gray-800">${product.discountedPrice}</span>
                            {product.discountedPrice < product.price ? (
                                <span className="text-sm text-gray-500 line-through">${product.price}</span>
                            ) : null}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Products;