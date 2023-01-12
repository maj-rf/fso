import { useState } from 'react';
import { PersonForm } from './PersonForm';
import { Filter } from './Filter';
import { Contacts } from './Contacts';
import { useEffect } from 'react';
import {
  getAllContacts,
  saveContact,
  deleteContact,
  updateContact,
} from './services/phonebook';
import './index.css';
import { Notification } from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [notifMessage, setNotifMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getAllContacts();
      setPersons(res);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const checkName = (obj) => obj.name === newPerson.name;
    if (persons.some(checkName)) {
      if (confirm(`Do you want to update ${newPerson.name}'s number?`)) {
        const existing = persons.find((x) => x.name === newPerson.name);
        const updatedContacts = persons.map((person) => {
          return person.id === existing.id
            ? { ...person, number: newPerson.number }
            : person;
        });
        const res = await updateContact(existing.id, {
          ...existing,
          number: newNumber,
        });
        setPersons(updatedContacts);
        setNotifMessage('Successfully updated');
        setTimeout(() => setNotifMessage(null), 3000);
        setNewName('');
        setNewNumber('');
      }
      return;
    } else {
      const res = await saveContact(newPerson);
      setPersons(persons.concat(res));
      setNotifMessage('Successfully saved');
      setTimeout(() => setNotifMessage(null), 3000);
      setNewName('');
      setNewNumber('');
      return;
    }
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

  const handleDelete = async (e, id, name) => {
    if (confirm(`Delete ${name} as contact?`)) {
      const res = await deleteContact(id);
      const filtered = persons.filter((person) => person.id !== id);
      setPersons(filtered);
      setNotifMessage('Successfully deleted');
      setTimeout(() => setNotifMessage(null), 3000);
    }
    return;
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notifMessage} />
      <Filter handleChange={handleChange} search={search} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Contacts
        persons={persons}
        search={search}
        filtered={filtered}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
