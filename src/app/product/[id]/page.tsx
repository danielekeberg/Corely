'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

function App() {
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState(null);
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
            product id: {id}
            {product && (
                <div>
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p>{product.description}</p>
                    <img src={product.image.url} alt={product.image.alt} />
                    <p>Price: ${product.price}</p>
                </div>
            )}
        </div>
    );
}

export default App;