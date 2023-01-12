import { ResultMessage } from './ResultMessage';
import { CountryList } from './CountryList';

export const SearchResults = ({ search, filter, showCountryView }) => {
  return (
    <>
      {search === '' ? (
        <ResultMessage text="No results." />
      ) : (
        <CountryList filter={filter} showCountryView={showCountryView} />
      )}
    </>
  );
};
