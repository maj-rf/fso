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
  const [notifMessage, setNotifMessage] = useState({ text: null, type: '' });

  useEffect(() => {
    (async () => {
      const res = await getAllContacts();
      setPersons(res);
    })();
  }, []);

  const showMessage = (message) => {
    setNotifMessage(message);
    setTimeout(() => setNotifMessage({ text: null, type: '' }), 3000);
  };

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
        console.log(existing);
        const updatedContacts = persons.map((person) => {
          return person.id === existing.id
            ? { ...person, number: newPerson.number }
            : person;
        });
        console.log(updatedContacts);
        try {
          const res = await updateContact(existing.id, {
            ...existing,
            number: newNumber,
          });
          setPersons(updatedContacts);
          showMessage({ text: 'Successfully Updated', type: 'success' });
          setNewName('');
          setNewNumber('');
        } catch (err) {
          console.log(err);
          if (err.response.status === 400)
            return showMessage({
              text: err.response.data.error,
              type: 'error',
            });
          return showMessage({ text: 'Already Deleted', type: 'error' });
        }
      }
      return;
    } else {
      try {
        const res = await saveContact(newPerson);
        setPersons([...persons].concat(res));
        showMessage({ text: 'Successfully Saved', type: 'success' });
        setNewName('');
        setNewNumber('');
        return;
      } catch (err) {
        showMessage({ text: err.response.data.error, type: 'error' });
        console.log(err);
      }
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
      showMessage({ text: 'Successfully Deleted', type: 'success' });
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
