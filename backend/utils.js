const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data/products.json");

const readData = () => {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };