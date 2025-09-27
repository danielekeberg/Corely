'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

type Product = {
    id: string | number;
    title: string;
    price: number;
    discountedPrice: number;
    rating: number;
    image: {
        url: string;
        alt: string;
    };
    description: string;
}

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [sortBy, setSortBy] = useState('name-asc');
    const [query, setQuery] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(false);
            try {
                const res = await fetch('https://v2.api.noroff.dev/online-shop', {
                    cache: "no-store"
                });
                if(!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setProducts(data.data as Product[]);
            } catch(e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const displayedProducts = useMemo(() => {
        const q = query.trim().toLowerCase();

        const filtered = q
        ? products.filter((p) => {
            const t = p.title.toLowerCase();
            const d = p.description.toLowerCase();
            return t.includes(q) || d.includes(q);
        })
        : products;

        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                case 'price-asc':
                    return a.discountedPrice - b.discountedPrice;
                case 'price-desc':
                    return b.discountedPrice - a.discountedPrice;
                default:
                    return 0;
            }
        });

        return sorted;
    }, [products, query, sortBy]);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error..</p>;

    return (
        <>
            <div className="flex justify-between px-60">
                <div className="relative w-1/3 py-4">
                    <input
                        id="search"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full p-2 border border-gray-300 bg-white text-sm px-9 rounded"
                    />
                    { query && (
                        <p className="mt-1 text-xs text-gray-500">
                            {displayedProducts.length} result{displayedProducts.length !== 1 ? "s" : ""} for "{query}"
                        </p>
                    )}
                    <img src="/icons/search.svg" alt="Search Icon" className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="py-4 flex items-center gap-4">
                    <select 
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 bg-white p-2 rounded text-sm">
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="px-60 grid grid-cols-4 gap-6 mb-10">
                {displayedProducts.map((product) => (
                    <Link href={`/product/${product.id}`} className="bg-white border border-gray-300 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors duration-150" key={product.id}>
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
        </>
    )
}

export default Products;