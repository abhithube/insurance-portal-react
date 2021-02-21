import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { AuthContext } from '../../contexts/AuthContext';
import useQuery from '../../hooks/useQuery';
import './LoginForm.css';

const LoginForm = ({ setError }) => {
  const { setAuthentication, removeAuthentication } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ username: null, password: null });

  const [loading, setLoading] = useState(false);

  const query = useQuery();
  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();

    if (errors.username || errors.password) return;

    try {
      setLoading(true);
      await Auth.signIn(username, password);
      setAuthentication(username);
      history.push(query.get('referrer') || '/dashboard');
    } catch (err) {
      removeAuthentication();
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  const validateInput = (element) => {
    let msg = null;
    let valid = true;
    switch (element.id) {
      case 'username':
        if (element.value.length === 0) {
          msg = 'Username cannot be empty';
          valid = false;
        }

        setErrors({ ...errors, username: msg });
        break;
      case 'password':
        if (element.value.length < 6) {
          msg = 'Password must be at least six characters';
          valid = false;
        }

        setErrors({ ...errors, password: msg });
        break;
      default:
        break;
    }
    return valid;
  };

  const handleFocus = (e) => {
    const styles = getComputedStyle(document.body);
    e.target.parentNode.style.border = `2px solid ${styles.getPropertyValue(
      '--color-primary'
    )}`;
  };

  const handleBlur = (e) => {
    const valid = validateInput(e.target);

    const styles = getComputedStyle(document.body);
    if (valid) e.target.parentNode.style.border = '2px solid #aaa';
    else
      e.target.parentNode.style.border = `2px solid ${styles.getPropertyValue(
        '--color-error'
      )}`;
  };

  return (
    <div id='login-component' className='card'>
      <h1 className='card-header'>Sign In</h1>
      <form className='card-body' onSubmit={submitForm}>
        <div className='login-field'>
          <i className='fas fa-user login-icon'></i>
          <input
            id='username'
            className='login-input'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className='login-error'>
          {errors.username && <i className='fas fa-exclamation-circle'></i>}
          <span className='login-error-msg'>{errors.username}</span>
        </div>
        <div className='login-field'>
          <i className='fas fa-lock login-icon'></i>
          <input
            id='password'
            className='login-input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className='login-error'>
          {errors.password && <i className='fas fa-exclamation-circle'></i>}
          <span className='login-error-msg'>{errors.password}</span>
        </div>
        <button className='button' type='submit' disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
