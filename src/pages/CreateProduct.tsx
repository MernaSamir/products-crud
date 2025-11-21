'use client';

import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/products";
import ProductForm from "../components/ProductForm";

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);



  const handleSubmit = async (formData: FormData) => {
    setError(null);

    try {
      await createProduct(formData);
        navigate("/products");
    
    } catch  {
      setError("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
       {error && (
        <p className="text-red-600 mt-2">{error}</p>
      )}
      <ProductForm onSubmit={handleSubmit} />
      
     
    </div>
  );
};

export default CreateProduct;
