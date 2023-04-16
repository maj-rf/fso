export const Notification = (props) => {
  if (!props) return null;
  return <div>{props.message}</div>;
};
