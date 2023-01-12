export const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} <span> {person.number}</span>{' '}
      <button onClick={(e) => handleDelete(e, person.id, person.name)}>
        Delete
      </button>
    </div>
  );
};
