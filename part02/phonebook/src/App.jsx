import { useState } from 'react';
import { PersonForm } from './PersonForm';
import { Filter } from './Filter';
import { Contacts } from './Contacts';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Percy Jackson', number: '040-123456', id: 1 },
    { name: 'Annabeth Chase', number: '39-44-5323523', id: 2 },
    { name: 'Magnus Chase', number: '12-43-234345', id: 3 },
    { name: 'Grover Underwood', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: Date.now().toString,
    };
    const checkName = (obj) => obj.name === newPerson.name;
    if (persons.some(checkName))
      return alert(`${newPerson.name} is already added`);
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const handleChange = (e) => {
    if (e.target.classList.contains('name')) setNewName(e.target.value);
    if (e.target.classList.contains('search')) {
      setSearch(e.target.value);
      const filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFiltered(filtered);
    }
    if (e.target.classList.contains('number')) setNewNumber(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleChange={handleChange} search={search} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Contacts persons={persons} search={search} filtered={filtered} />
    </div>
  );
};

export default App;
