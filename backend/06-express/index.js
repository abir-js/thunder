import express from "express";
import { products } from "./data.js";

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
  const { price, rating, category } = req.query;

  let filteredData = products;

  if (price) {
    filteredData = filteredData.filter(
      (product) => product.price >= Number(price),
    );
  }

  if (rating) {
    filteredData = filteredData.filter(
      (product) => product.rating >= Number(rating),
    );
  }

  if (category) {
    filteredData = filteredData.filter(
      (product) => product.category === category,
    );
  }

  res.json(filteredData);
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

app.post("/products", (req, res) => {
  const product = req.body;

  products.push(product);

  res.status(200).json({
    message: "Data added successfully",
    product,
  });
});

app.patch("/products/:id", (req, res) => {
  const id = req.params.id;
  const { price, rating } = req.body;

  let product;

  if (id) {
    product = products.find((p) => p.id === parseInt(id));

    if (price) {
      product.price = parseInt(price);
    }

    if (rating) {
      product.rating = Number(rating);
    }
  }

  res.json({
    message: "Updated successfully",
    product,
  });
});

app.delete("/products/:id", (req, res) => {
  let { id } = req.params;

  const index = products.findIndex((p) => p.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const deletedProduct = products.splice(index, 1);

  res.status(200).json({
    message: "Data deleted successfully",
    deletedProduct,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
