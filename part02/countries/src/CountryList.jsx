import { CountryDetail } from './CountryDetail';
import { ResultMessage } from './ResultMessage';
import { Country } from './Country';

export const CountryList = ({ filter, showCountryView }) => {
  if (filter.length === 1)
    return <CountryDetail key={filter[0].name.common} country={filter[0]} />;
  return (
    <>
      {filter.length > 10 ? (
        <ResultMessage text="Too many results. Try another query." />
      ) : (
        filter?.map((country) => {
          return (
            <Country
              key={country.name.common}
              country={country}
              showCountryView={showCountryView}
            />
          );
        })
      )}
    </>
  );
};
