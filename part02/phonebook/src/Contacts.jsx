import { Person } from './Person';

export const Contacts = ({ persons, filtered, search, handleDelete }) => {
  const result = search ? filtered : persons;
  return (
    <section>
      <h2>Numbers</h2>
      {result.map((person) => {
        return (
          <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        );
      })}
    </section>
  );
};
