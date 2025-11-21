import type { Product } from "../types";

const BASE_URL = "http://localhost:5000/products";

export const fetchProducts =async  (): Promise<Product[]> => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const fetchProductById = async (id: string|undefined): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createProduct = async (data: FormData): Promise<void> => {
  await fetch(BASE_URL, {
    method: "POST",
    body: data,
  });
};


export const updateProduct = async (id: string, data: FormData): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: data,
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};


