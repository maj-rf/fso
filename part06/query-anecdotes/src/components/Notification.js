import { useNotifValue } from '../NotifContext';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const notifValue = useNotifValue();

  if (!notifValue) return null;

  return <div style={style}>{notifValue}</div>;
};

export default Notification;
