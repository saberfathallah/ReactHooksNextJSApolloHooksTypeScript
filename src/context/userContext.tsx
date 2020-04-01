import React, { createContext, useState } from "react";

interface IContextValue {
  isAuth: boolean;
  userName: string;
  setUserName: (userName: string) => void;
  setIsAuth: (isAuth: boolean) => void;
}

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
}) => {
  const initialState = {
    userName,
    isAuth,
  };

  const [state, setState] = useState(initialState);

  const setUserName = (userName:string): void=> setState({ ...state, userName });
  const setIsAuth = (isAuth: boolean): void => setState({ ...state, isAuth });


  const updatedInitialState: any= {
    ...state,
    setUserName,
    setIsAuth,
  };

  return <UserContext.Provider value={updatedInitialState}>{children}</UserContext.Provider>;
};

export default UserContext;
