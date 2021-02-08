import { createContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const baseUrl =
    'https://app.at-insurance.com/member-details-service/members/';

  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    updateAuthentication();
  }, []);

  const updateAuthentication = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username);
      setLoggedIn(true);
    } catch (err) {
      setUsername(null);
      setLoggedIn(false);
      return null;
    }
  };

  const register = async (username, email, password) => {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      };
      const res = await fetch(baseUrl, requestOptions);
      return res.ok;
    } catch (err) {
      return false;
    }
  };

  const login = async (username, password) => {
    try {
      await Auth.signIn(username, password);
      updateAuthentication();
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      updateAuthentication();
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ username, loggedIn, register, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
