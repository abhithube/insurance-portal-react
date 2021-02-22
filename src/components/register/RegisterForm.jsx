import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import axios from 'axios';

import './RegisterForm.css';

const membersUrl = process.env.REACT_APP_MEMBERS_URL;

const RegisterForm = ({ setError }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  });

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    if (errors.username || errors.email || errors.password) return;

    try {
      setLoading(true);
      await Auth.signUp({ username, password, attributes: { email } });
      await axios.post(membersUrl, { username, email });
      setRedirect(true);
    } catch (err) {
      setError(err.message);
    } finally {
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
      case 'email':
        if (!element.value.includes('@')) {
          msg = 'Email is not valid';
          valid = false;
        }

        setErrors({ ...errors, email: msg });
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
    <div id='register-component' className='card'>
      <h1 className='card-header'>Sign Up</h1>
      <form className='card-body' onSubmit={submitForm}>
        <div className='register-field'>
          <i className='fas fa-user register-icon'></i>
          <input
            id='username'
            className='register-input'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className='register-error'>
          {errors.username && <i className='fas fa-exclamation-circle'></i>}
          <span className='register-error-msg'>{errors.username}</span>
        </div>
        <div className='register-field'>
          <i className='fas fa-envelope register-icon'></i>
          <input
            id='email'
            className='register-input'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className='register-error'>
          {errors.email && <i className='fas fa-exclamation-circle'></i>}
          <span className='register-error-msg'>{errors.email}</span>
        </div>
        <div className='register-field'>
          <i className='fas fa-lock register-icon'></i>
          <input
            id='password'
            className='register-input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className='register-error'>
          {errors.password && <i className='fas fa-exclamation-circle'></i>}
          <span className='register-error-msg'>{errors.password}</span>
        </div>
        <button className='button' type='submit' disabled={loading}>
          Submit
        </button>
      </form>
      {redirect && (
        <Redirect
          push
          to={{
            pathname: '/login',
            state: {
              alert: {
                type: 'success',
                message: 'Account created successfully',
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default RegisterForm;
