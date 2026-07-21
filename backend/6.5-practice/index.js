import express from "express";
import { movies } from "./data.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/movies", (req, res) => {
  let filteredData = movies;

  const { rating, releaseYear, duration, availableOnOTT } = req.query;

  if (rating) {
    filteredData = filteredData.filter((prod) => prod.rating >= Number(rating));
  }

  if (releaseYear) {
    filteredData = filteredData.filter(
      (prod) => prod.releaseYear === Number(releaseYear),
    );
  }

  if (duration) {
    filteredData = filteredData.filter(
      (prod) => prod.duration >= Number(duration),
    );
  }

  if (availableOnOTT) {
    filteredData = filteredData.filter(
      (movie) => movie.availableOnOTT === (availableOnOTT === "true"),
    );
  }

  res.json(filteredData);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  const movie = movies.find((prod) => prod.id === Number(id));

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
