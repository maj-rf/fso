import { useReducer, createContext, useContext } from 'react';

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'show':
      return action.payload.notif;
    case 'hide':
      return '';
    default:
      return state;
  }
};

export const NotifContext = createContext();

export const useNotifValue = () => {
  const arr = useContext(NotifContext);
  return arr[0];
};

export const useNotifDispatch = () => {
  const arr = useContext(NotifContext);
  return arr[1];
};

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, '');

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  );
};
