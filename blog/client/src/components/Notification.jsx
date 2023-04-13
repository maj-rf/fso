import { useNotifValue } from '../context/NotificationContext';

export const Notification = () => {
  const message = useNotifValue();
  if (message.notif === null) {
    return null;
  }

  return <div className={'notif ' + message.notifType}>{message.notif}</div>;
};
