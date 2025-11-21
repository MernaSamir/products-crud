import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, deleteProduct } from "../api/products";
import ProductImage from "../components/ProductImage";
import type { Product } from "../types";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return setError("No product ID provided.");

    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!product?.id) return;
    try {
      await deleteProduct(product.id);
      navigate("/products");
    } catch {
      alert("Failed to delete product.");
    }
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center p-6 text-red-600">{error}</p>;
  if (!product) return <p className="text-center p-6 text-red-600">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-4">
          {product.images.length > 1 && (
            <div className="flex flex-col gap-2">
              {product.images.slice(1).map((img, idx) => (
                <ProductImage
                  key={idx}
                  src={img.startsWith("http") ? img : `http://localhost:5000${img}`}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded cursor-pointer hover:ring-2 hover:ring-black"
                />
              ))}
            </div>
          )}
          <div className="flex-1">
            <ProductImage
              src={product.images[0] || ""}
              alt={product.title}
              className="w-full h-[400px] object-cover rounded"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl font-semibold text-gray-800">{product.price}$</p>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-gray-700">Quantity: {product.quantity}</p>
          <p className="text-gray-700">{product.description}</p>

          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate(`/products/edit/${product.id}`)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
