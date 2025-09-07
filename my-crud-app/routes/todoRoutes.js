const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos); // Return JSON instead of rendering EJS
});

// Add new todo
router.post("/todos", async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  });
  await todo.save();
  res.json(todo);
});

// Mark todo as completed
router.put("/todos/:id/complete", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true }
  );
  res.json(todo);
});

// Delete todo
router.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

module.exports = router;
