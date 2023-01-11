export const PersonForm = ({
  handleSubmit,
  handleChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new contact</h2>
      <div>
        <label htmlFor="name">name: </label>
        <input className="name" onChange={handleChange} value={newName} />
      </div>
      <div>
        <label htmlFor="number">number: </label>
        <input className="number" onChange={handleChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
