import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ username: null, password: null });

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!errors.username && !errors.password) {
      const success = await login(username, password);
      if (success) history.replace('/');
      else history.push('/login?invalid=true');
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

        setErrors({
          username: msg,
          password: errors.password,
        });
        break;
      case 'password':
        if (element.value.length < 6) {
          msg = 'Password must be at least six characters';
          valid = false;
        }

        setErrors({
          username: errors.username,
          password: msg,
        });
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
    <div id='login-component'>
      <h1 id='login-title'>Sign In</h1>
      <form id='login-form' onSubmit={submitForm}>
        <div className='login-field'>
          <i className='fas fa-user login-icon'></i>
          <input
            id='username'
            className='login-input'
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></input>
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
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></input>
        </div>
        <div className='login-error'>
          {errors.password && <i className='fas fa-exclamation-circle'></i>}
          <span className='login-error-msg'>{errors.password}</span>
        </div>
        <button id='login-button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
