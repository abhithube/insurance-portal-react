import { createContext, useState } from 'react';
import { Auth } from 'aws-amplify';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const baseUrl = 'http://localhost:8000/member-details-service/members/';
  const [user, setUser] = useState(null);

  const register = async (username, email, password) => {
    try {
      await Auth.signUp(username, password, { email });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      };
      fetch(baseUrl, requestOptions);
    } catch (err) {
      throw err;
    }
  };

  const login = async (username, password) => {
    try {
      await Auth.signIn(username, password);
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (err) {
      throw err;
    }
  };

  const isLoggedIn = async () => {
    return (await Auth.currentAuthenticatedUser()) !== null;
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
