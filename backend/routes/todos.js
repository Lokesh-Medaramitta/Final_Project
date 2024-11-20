const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ is_complete: false });
    res.send(todos);
  } catch (error) {
    res.status(500).send({ error: "Error fetching todos" });
  }
});

// GET todo based on ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    if (!todo) {
      return res.status(404).send({ error: "Todo not found!" });
    }
    res.send(todo);
  } catch (error) {
    res.status(500).send({ error: "Error fetching todo" });
  }
});

// POST create new todo
router.post("/", async (req, res) => {
  try {
    // Destructure fields from request body
    const {
      title,
      description,
      dosage,
      manufacturingDate,
      expiryDate,
      image,
    } = req.body;

    // Create a new todo document
    const todo = new Todo({
      title,
      description,
      dosage,
      manufacturingDate,
      expiryDate,
      image,
      is_complete: req.body.is_complete || false, // Default to false if not provided
    });

    // Save the todo to the database
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send({ error: "Error creating todo" });
  }
});

// UPDATE todo
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
      return res.status(404).send({ error: "Todo not found!" });
    }

    // Update fields if provided in the request body
    if (req.body.title) todo.title = req.body.title;
    if (req.body.description) todo.description = req.body.description;
    if (req.body.dosage) todo.dosage = req.body.dosage;
    if (req.body.manufacturingDate) todo.manufacturingDate = req.body.manufacturingDate;
    if (req.body.expiryDate) todo.expiryDate = req.body.expiryDate;
    if (req.body.image) todo.image = req.body.image;
    if (req.body.is_complete !== undefined) todo.is_complete = req.body.is_complete; // Check for explicitly undefined

    // Save the updated todo
    await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(500).send({ error: "Error updating todo" });
  }
});

module.exports = router;


// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Todo does not exist!" });
  }
});

module.exports = router;
