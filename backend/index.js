const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// Enable frontend requests
app.use(cors());
app.use(express.json());

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("'uploads/' folder created!");
}

// access uploaded files
app.use("/uploads", express.static(uploadsDir));

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
