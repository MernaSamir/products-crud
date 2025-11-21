"use client";

import React, {
  useState,
  type ChangeEvent,
  type FormEvent,
  useTransition,
} from "react";
import ProductImage from "./ProductImage";
import type { Product } from "./../types";
import ColorPicker from "./ColorPicker";

// ColorPicker Component


// ProductForm Props
interface ProductFormProps {
  initialData?: Product;
  onSubmit: (formData: FormData) => void;
  categories?:string[]
}

const availableColors = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#0000ff",
  "#00ff00",
  "#ffff00",
  "#ff00ff",
];

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  categories,
}) => {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "",
    price: initialData?.price || 0,
    quantity: initialData?.quantity || 0,
    colors: (initialData?.colors || []).map((c) => c.toLowerCase()), // normalize
  });

  const [existingImages, setExistingImages] = useState<string[]>(
    initialData?.images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter((f) =>
        f.type.startsWith("image/")
      );
      setNewImages((prev) => [...prev, ...files]);
    }
  };

  const removeExistingImage = (idx: number) =>
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  const removeNewImage = (idx: number) =>
    setNewImages((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("price", form.price.toString());
    formData.append("quantity", form.quantity.toString());
    formData.append("colors", JSON.stringify(form.colors));
    newImages.forEach((file) => formData.append("images", file));
    formData.append("existingImages", JSON.stringify(existingImages));

    startTransition(() => onSubmit(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {initialData ? "Edit Product" : "Create Product"}
      </h2>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Category</label>
        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          required
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories?.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
       
      </div>

      {/* Price & Quantity */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Price</label>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
            required
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            required
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Colors</label>
        <ColorPicker
          colors={availableColors}
          selectedColors={form.colors}
          onChange={(colors) => setForm((prev) => ({ ...prev, colors }))}
        />
      </div>

      {/* Images Preview */}
      <div className="flex flex-wrap gap-2">
        {existingImages.map((img, idx) => (
          <div key={`existing-${idx}`} className="relative group">
            <ProductImage
              src={img.startsWith("http") ? img : `http://localhost:5000${img}`}
              alt={`Existing Image ${idx + 1}`}
              className="h-24 w-24 border rounded object-cover"
            />
            <button
              type="button"
              onClick={() => removeExistingImage(idx)}
              className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              X
            </button>
          </div>
        ))}

        {newImages.map((file, idx) => (
          <div key={`new-${idx}`} className="relative group">
            <ProductImage
              src={URL.createObjectURL(file)}
              alt={`New Image ${idx + 1}`}
              className="h-24 w-24 border rounded object-cover"
            />
            <button
              type="button"
              onClick={() => removeNewImage(idx)}
              className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-500 file:text-white
                   hover:file:bg-blue-600 cursor-pointer"
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ProductForm;
