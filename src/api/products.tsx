import type { Product } from "../types";

// Generic base URL
const BASE_URL = "http://localhost:5000";

// Products APIs
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

export const fetchProductById = async (id: string | undefined): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

export const createProduct = async (data: FormData): Promise<void> => {
  await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: data,
  });
};

export const updateProduct = async (id: string, data: FormData): Promise<void> => {
  await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    body: data,
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
};

// Categories APIs
export const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};
