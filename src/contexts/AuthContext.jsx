import { createContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then((res) => setAuthentication(res.username))
      .catch((err) => removeAuthentication())
      .finally(() => setLoading(false));
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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
