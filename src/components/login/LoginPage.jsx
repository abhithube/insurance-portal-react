import { useState } from 'react';

import LoginForm from './LoginForm';
import Alert from '../util/Alert';
import useAlert from '../../hooks/useAlert';
import './LoginPage.css';

const LoginPage = () => {
  const { alert } = useAlert();
  const [error, setError] = useState(null);

  return (
    <div id='login-page'>
      <div id='login-alert'>
        {error ? (
          <Alert type='error' message={error} />
        ) : (
          alert && <Alert type={alert.type} message={alert.message} />
        )}
      </div>
      <div id='login-body'>
        <LoginForm setError={setError} />
      </div>
    </div>
  );
};

export default LoginPage;
