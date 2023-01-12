import { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter } from './Filter';
import { SearchResults } from './SearchResults';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let unmount = false;
    async function getCountries() {
      const { data } = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(data);
    }
    getCountries();
    return () => {
      unmount = true;
    };
  }, []);

  const getFilter = (name) => {
    const filtered = countries?.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );
    return filtered;
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setFilter(getFilter(e.target.value));
  };

  const showCountryView = (e, name) => {
    setSearch(name);
    setFilter(getFilter(name));
  };

  return (
    <div className="App">
      <Filter handleChange={handleChange} search={search} />
      <SearchResults
        search={search}
        filter={filter}
        showCountryView={showCountryView}
      />
    </div>
  );
}

export default App;
