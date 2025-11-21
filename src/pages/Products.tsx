"use client";

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/products";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import ErrorBoundary from "../components/ErrorBoundary";
import { useGlobalContext } from "../context/globalContext";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
const { categories } = useGlobalContext()

  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchProducts();
        if (!data || data.length === 0) {
          setProducts([]);
          setError(true);
        } else {
          setProducts(data);
        }
      } catch {
        console.error("Failed to fetch products");
        setError(true);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);



  // Filter products based on search and category
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) &&
          (categoryFilter ? p.category === categoryFilter : true)
      ),
    [products, search, categoryFilter]
  );

  if (loading) {
    return <div className="text-center p-6">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-600">
        <b>Failed to load products. Please try again later.</b>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="p-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600 mt-1">
            Browse and manage all your products in one place
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Create Product */}
          <button
            onClick={() => navigate("/products/create")}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Loading..." : "Create Product"}
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-gray-500 text-center p-6">No products found.</div>
        ) : (
          <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
