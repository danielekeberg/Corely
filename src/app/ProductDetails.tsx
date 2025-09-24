import { useState, useEffect } from "react";

function ProductDetails() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://v2.api.noroff.dev/online-shop/109566af-c5c2-4f87-86cb-76f36fb8d378`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={product.image.url} alt={product.image.alt} className="w-full h-96 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <div className="mt-4 flex gap-2 items-center">
        <span className="text-xl font-semibold">${product.discountedPrice}</span>
        {product.discountedPrice < product.price && (
          <span className="line-through text-gray-500">${product.price}</span>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;