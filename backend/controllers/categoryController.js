const { readData } = require("../utils");

const getCategories = (req, res) => {
  const products = readData(); 
  const categories = Array.from(new Set(products.map(p => p.category))); 
  res.json(categories);
};

module.exports = { getCategories };
