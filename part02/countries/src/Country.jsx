export const Country = ({ country, showCountryView }) => {
  return (
    <div>
      <p>
        {country.name.common}{' '}
        <button onClick={(e) => showCountryView(e, country.name.common)}>
          show
        </button>
      </p>
    </div>
  );
};
