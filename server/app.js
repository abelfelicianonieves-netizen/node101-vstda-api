const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// Starting list of tasks
let todoItems = [
  {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  }
];

// GET - Check server status
app.get('/', function(req, res) {
  res.status(200).json({ status: 'ok' });
});

// GET - Get all tasks
app.get('/api/TodoItems', function(req, res) {
  res.status(200).json(todoItems);
});

// GET - Get one task
app.get('/api/TodoItems/:number', function(req, res) {
  let id = Number(req.params.number);

  let item = todoItems.find(function(todo) {
    return todo.todoItemId === id;
  });

  if (!item) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(item);
});

// POST - Add a new task
app.post('/api/TodoItems', function(req, res) {
  let newItem = req.body;

  todoItems.push(newItem);

  res.status(201).json(newItem);
});

// DELETE - Remove a task
app.delete('/api/TodoItems/:number', function(req, res) {
  let id = Number(req.params.number);

  let index = todoItems.findIndex(function(todo) {
    return todo.todoItemId === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  let deletedItem = todoItems.splice(index, 1)[0];

  res.status(200).json(deletedItem);
});

module.exports = app;