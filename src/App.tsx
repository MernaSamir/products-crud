'use client';

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} /> {/* details route */}
      </Routes>
    </Router>
  );
};

export default App;
