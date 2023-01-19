const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');
require('dotenv').config();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
logger.token('body', (req) => JSON.stringify(req.body));
app.use(
  logger(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/persons', async (request, response) => {
  const people = await Person.find({});
  response.json(people);
});

app.get('/api/info', async (request, response) => {
  const people = await Person.find({});
  const date = new Date();
  const length = people.length;
  const div = `<div>
  <p>Phonebook has info for ${length} people<p>
  <p>${date}</p>
  <div>`;
  response.send(div);
});

app.get('/api/persons/:id', async (request, response) => {
  try {
    const person = await Person.findById(request.params.id);
    if (!person) return response.status(404).end();
    response.json(person);
  } catch (err) {
    console.log(err);
    response.status(500).end();
  }
});

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.put('/api/persons/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndUpdate(request.params.id, {
      name: request.body.name,
      number: request.body.number,
    });
    response.status(200).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.post('/api/persons', async (request, response) => {
  const body = request.body;
  const checkIfNameExists = (obj) => obj.name === body.name;
  const people = await Person.find({});

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

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  const createPerson = await newPerson.save();
  response.json(createPerson);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
