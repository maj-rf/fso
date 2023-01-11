export const Person = (props) => {
  return (
    <div>
      {props.person.name} <span> {props.person.number}</span>
    </div>
  );
};
