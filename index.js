const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');

let people = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.use(cors());
logger.token('body', (req) => JSON.stringify(req.body));
app.use(express.json());
app.use(
  logger(':method :url :status :res[content-length] - :response-time ms :body')
);

const generateId = () => {
  const id = Math.floor(Math.random() * 123456789);
  const checkIfIdExists = (obj) => obj.id === Number(id);
  return people.some(checkIfIdExists) ? generateId() : id;
};

app.get('/api/persons', (request, response) => {
  response.json(people);
});

app.get('/api/info', (request, response) => {
  const date = new Date();
  const length = people.length;
  const div = `<div>
  <p>Phonebook has info for ${length} people<p>
  <p>${date}</p>
  <div>`;
  response.send(div);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((person) => person.id === id);
  return person ? response.json(person) : response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  const checkIfNameExists = (obj) => obj.name === body.name;

  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: 'Missing input. Please fill all details' });
  }

  if (people.some(checkIfNameExists)) {
    return response
      .status(400)
      .json({ error: 'Name already exists. Must be unique.' });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  people = people.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
