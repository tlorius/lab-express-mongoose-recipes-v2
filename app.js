const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  const payload = req.body;
  try {
    const createdRecipe = await Recipe.create(payload);
    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to create recipe" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all recipes" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await Recipe.findById(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch single recipe" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, payload, {
      new: true,
    });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to update single recipe" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Recipe.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete single recipe" });
  }
});

// Start the server
app.listen(5004, () => console.log("My first app listening on port 5004!"));

//DO NOT REMOVE THE BELOW CODE
module.exports = app;
