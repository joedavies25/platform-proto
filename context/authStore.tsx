import { createContext, useReducer } from 'react';

const authContext = createContext({ id_token: false });

const { Provider } = authContext;

const AuthProvider = ({ children }) => {
  return <Provider>{children}</Provider>;
};

const useAuthContext = () => {
  return useContext(authContext);
};

export { AuthProvider, useAuthContext };
