import { useContext, createContext, useReducer } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'RESET':
      return null;
    default:
      return null;
  }
};

export const UserContext = createContext();

export const useUserValue = () => {
  const arr = useContext(UserContext);
  return arr[0];
};

export const useUserDispatch = () => {
  const arr = useContext(UserContext);
  return arr[1];
};

export const UserProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
