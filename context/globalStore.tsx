import React, { createContext, useReducer } from 'react';

const initialState = {
  activeContent: 'DASHBOARD',
};

const globalContext = createContext(initialState);

const { Provider } = globalContext;

const Reducer = (state, action) => {
  switch (action.type) {
    case 'changeContent':
      const newState = { ...state, activeContent: action.payload };
      return newState;
    default:
      throw new Error();
  }
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const value = { state, dispatch };

  return <Provider value={value}>{children}</Provider>;
};

export { GlobalProvider, globalContext };
