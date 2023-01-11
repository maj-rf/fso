import { useState } from 'react';

const Person = (props) => {
  return <div>{props.person.name}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName };
    const checkName = (obj) => obj.name === newPerson.name;
    if (persons.some(checkName))
      return alert(`${newPerson.name} is already added`);
    setPersons(persons.concat(newPerson));
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <section>
        {persons.map((person) => {
          return <Person key={person.name} person={person} />;
        })}
      </section>
    </div>
  );
};

export default App;
