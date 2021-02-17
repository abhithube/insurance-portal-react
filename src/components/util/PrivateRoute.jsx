import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: {
          alert: {
            type: 'error',
            message: 'You must be logged in to continue',
          },
        },
      }}
    />
  );
};

export default PrivateRoute;
