import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //  In useEffect, the first arguement is the anonymous function and the second arg is the array of dependencies.
  useEffect(() => {
    //  We've to write this part in useEffect hook, otherwise the app would fall into infinite loop.
    //  Now, that we have written this part in useEffect hook, then this hook would run during compilation and during component re-evaluation.(Only dependency would change.)
    const info = localStorage.getItem('isLoggedIn');
    if (info === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    // Store in the local storage once the user is logged in.
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    //  storage gets cleared once the user is logged out.
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
