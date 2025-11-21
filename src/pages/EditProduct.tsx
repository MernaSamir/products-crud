'use client';

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../api/products";
import ProductForm from "../components/ProductForm";
import type { Product } from "../types";
import ErrorBoundary from "../components/ErrorBoundary";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load product
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("No product ID provided.");
        setLoading(false);
        return;
      }

      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch {
        setError(
          "Failed to load product. Please check your network or the product may not exist."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    if (!id) return setError("Failed to update product");

    setError(null);
    try {
      await updateProduct(id, formData);
      navigate("/products");
    } catch {
      setError("Failed to update product");
    }
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error || !product)
    return <p className="text-center p-6 text-red-600">{error}</p>;

  return (
    <ErrorBoundary>
      <div className="p-4">
        <ProductForm
          onSubmit={handleSubmit}
          initialData={product}
          categories={categories} // pass categories to form
        />
      </div>
    </ErrorBoundary>
  );
};

export default EditProduct;
