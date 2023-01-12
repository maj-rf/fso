import { Weather } from './Weather';

export const CountryDetail = ({ country }) => {
  const langs = [];
  for (const lang in country.languages) langs.push(country.languages[lang]);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital(s): {country.capital.join(', ')}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {langs.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common + 'flag'} />
      <Weather name={country.name.common} />
    </div>
  );
};
