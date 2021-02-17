import { createContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((res) => setAuthentication(res.username))
      .catch((err) => {
        console.log(err);
        removeAuthentication();
      });
  }, []);

  const setAuthentication = (username) => {
    setCurrentUser(username);
    setIsAuthenticated(true);
  };

  const removeAuthentication = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        setAuthentication,
        removeAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
