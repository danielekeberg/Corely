'use client';

import Header from "../../Header";
import Back from "../../Back";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

type Product = {
    id: string | number;
    title: string;
    price: number;
    discountedPrice: number;
    rating: number;
    tags: string[];
    image: {
        url: string;
        alt: string;
    };
    description: string;
}

function App() {
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`, {
                cache: 'no-store',
            });
            const data = await res.json();
            const prod = data.data;
            console.log(prod);
            setProduct(prod);
            console.log(product)

            
        }

        fetchProduct();
    }, [id]);

    return (
        <div>
            <Header />
            <Back />
            <div className="px-60 mb-10">
            {product && (
                <div className="flex gap-6">
                    <div className="w-1/2 relative">
                        <img src={product.image.url} alt={product.image.alt} className="w-full h-120 object-cover border border-gray-300" />
                        {product.discountedPrice < product.price ? (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xl font-bold px-2 py-1 rounded">{((product.price - product.discountedPrice) / product.price * 100).toFixed(0)}%</span>
                        ) : null}
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-4xl font-bold">{product.title}</h1>
                        <div className="mt-4 flex gap-2 items-center">
                            <img src="/icons/star.svg" alt="Star Icon" className="w-4 h-4 inline-block mr-1" />
                            <span className="text-md font-semibold">{product.rating.toFixed(1)}</span>
                        </div>
                        <div>
                            {product.discountedPrice < product.price ?
                                <div className="mt-4 mb-2">
                                    <div className="flex gap-3 items-center">
                                        <h1 className="font-bold text-blue-500 text-3xl">${product.discountedPrice}</h1>
                                        <span className="line-through text-gray-400 text-xl">${product.price}</span>
                                    </div>
                                    <span className="text-green-700 font-semibold">You save ${(product.price - product.discountedPrice).toFixed(2)}</span>
                                </div>
                                :
                                <h1>${product.price}</h1>
                            }
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Description</h3>
                            <p className="text-gray-500">{product.description}</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag) => (
                                    <span key={tag} className="bg-gray-200 border border-gray-300 text-sm text-gray-700 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-md font-semibold">Quantity</h3>
                            <div className="flex items-center gap-4 mt-2">
                                <input id="quantity" type="number" min="1" defaultValue="1" className="w-20 border border-gray-300 rounded px-2 py-1" />
                            </div>
                        </div>
                        <button className="bg-blue-500 text-white w-full cursor-pointer font-bold mt-6 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-150">Add to Cart - ${product.discountedPrice}</button>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default App;