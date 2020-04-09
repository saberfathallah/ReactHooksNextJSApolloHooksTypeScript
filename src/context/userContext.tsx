/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

const UserContext = createContext({
  isAuth: false,
  userName: '',
  setUserName: () => {},
  setIsAuth: () => {},
});

export const UserProvider = ({
  children,
  isAuth,
  userName,
}): JSX.Element => {
  const initialState = {
    userName,
    isAuth,
  };

  const [state, setState] = useState(initialState);

  const setUserName = (name: string): void => setState({ ...state, userName: name });
  const setIsAuth = (auth: boolean): void => setState({ ...state, isAuth: auth });


  const updatedInitialState: any = {
    ...state,
    setUserName,
    setIsAuth,
  };

  return <UserContext.Provider value={updatedInitialState}>{children}</UserContext.Provider>;
};

export default UserContext;
