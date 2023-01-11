export const Filter = ({ handleChange, search }) => {
  return (
    <form>
      <div>
        <label htmlFor="search">Filter: </label>
        <input className="search" onChange={handleChange} value={search} />
      </div>
    </form>
  );
};
