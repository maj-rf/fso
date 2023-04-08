import { useSelector } from 'react-redux';

export const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  const notification = useSelector((state) => state.notification);

  return <>{notification ? <div style={style}>{notification}</div> : null}</>;
};
