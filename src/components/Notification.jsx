export const Notification = ({ message }) => {
  if (message.text === null) {
    return null;
  }

  return <div className={'notif ' + message.type}>{message.text}</div>;
};
