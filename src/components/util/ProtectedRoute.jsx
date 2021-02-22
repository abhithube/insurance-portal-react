import { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ path, component }) => {
  const { loading, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return (
    !loading &&
    (isAuthenticated ? (
      <Route path={path} component={component} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          search: `?referrer=${location.pathname + location.search}`,
          state: {
            alert: {
              type: 'error',
              message: 'You must be logged in to continue',
            },
          },
        }}
      />
    ))
  );
};

export default ProtectedRoute;
