import { useState } from 'react';

import RegisterForm from './RegisterForm';
import Alert from '../util/Alert';
import './RegisterPage.css';

const RegisterPage = () => {
  const [error, setError] = useState(null);

  return (
    <div id='register-page'>
      <div id='register-alert'>
        {error && <Alert type='error' message={error} />}
      </div>
      <RegisterForm setError={setError} />
    </div>
  );
};

export default RegisterPage;
