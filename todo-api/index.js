const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use Azure-provided port if available

app.use(express.json());

// In-memory to-do list
let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Build a backend project", completed: false }
];

// CRUD routes
app.get('/todos', (req, res) => res.json(todos));

app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  const { task, completed } = req.body;
  if (task !== undefined) todo.task = task;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`To-do API running at http://localhost:${port}`);
});


