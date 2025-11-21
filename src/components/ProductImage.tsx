import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className }) => {
  const finalSrc = src.startsWith("http") || src.startsWith("blob:") ? src : `http://localhost:5000${src}`;
  return (
    <img
      src={finalSrc}
      alt={alt}
      className={`h-32 w-32 object-cover rounded ${className || ""}`}
    />
  );
};

export default ProductImage;
