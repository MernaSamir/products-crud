import React from "react";

import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="rounded-lg border border-gray-300 hover:border-black shadow hover:shadow-lg transition p-4 cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Main Image */}
      {product.images?.[0] && (
        <ProductImage src={product.images[0]} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
      )}

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="font-medium">{product.price}$</p>
        <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
      </div>
    </div>
  );
};

export default ProductCard;
