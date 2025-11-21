const { readData, writeData } = require("../utils");


// Get all products
const getProducts = (req, res) => {
  const products = readData();
  res.json(products);
};

// Get product by ID
const getProductById = (req, res) => {
  const products = readData();
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    throw new Error("Product not found"); 
  }

  res.json(product);
};


// Create a new product
const createProduct = (req, res) => {
  const products = readData();

  // Parse colors from frontend (JSON string)
  const colors = req.body.colors ? JSON.parse(req.body.colors) : [];

  const newProduct = {
    id: Date.now().toString(),
    title: req.body.title,
    category: req.body.category,
    price: parseFloat(req.body.price),
    quantity: parseInt(req.body.quantity),
    colors, 
    images: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
  };

  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
};



// Update a product
const updateProduct = (req, res) => {
  const products = readData();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const product = products[index];

  // Existing images URLs from frontend
  const existingImages = req.body.existingImages
    ? JSON.parse(req.body.existingImages)
    : [];

  // New uploaded images (Multer saves them automatically in 'uploads/')
  const newImages = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

  // Combine
  const updatedImages = [...existingImages, ...newImages];

  // Parse colors from frontend
  const colors = req.body.colors ? JSON.parse(req.body.colors) : [];

  products[index] = {
    ...product,
    title: req.body.title,
    category: req.body.category,
    price: parseFloat(req.body.price),
    quantity: parseInt(req.body.quantity),
    colors,       
    images: updatedImages,
  };

  writeData(products);
  res.json(products[index]);
};
// Delete a product
const deleteProduct = (req, res) => {
  let products = readData();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  products = products.filter(p => p.id !== req.params.id);
  writeData(products);
  res.json({ message: "Product deleted successfully" });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
