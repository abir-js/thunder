import express from "express";
import { products } from "./data.js";

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
  res.json(products);
});

// query params
app.get("/products/search", (req, res) => {
  const { name, minPrice, maxPrice } = req.query;
  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= parseFloat(minPrice),
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= parseFloat(maxPrice),
    );
  }

  res.json(filteredProducts);
});

// route params
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  return res.json(product);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
