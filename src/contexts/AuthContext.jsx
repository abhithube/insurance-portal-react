import { createContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [currestUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    updateAuthStatus();
  }, []);

  const updateAuthStatus = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user.username);
      setIsAuthenticated(true);
    } catch (err) {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currestUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
