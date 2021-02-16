import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import './RegisterForm.css';

const RegisterForm = () => {
  const membersUrl = process.env.REACT_APP_MEMBERS_URL;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  });

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!errors.username && !errors.password) {
      try {
        await Auth.signUp({ username, password, attributes: { email } });
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email }),
        };
        const res = await fetch(membersUrl, requestOptions);
        if (res.ok) history.replace('/login?registered=true');
      } catch (err) {
        history.push('/register?invalid=true');
      }
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
          email: errors.email,
          password: errors.password,
        });
        break;
      case 'email':
        if (!element.value.includes('@')) {
          msg = 'Email is not valid';
          valid = false;
        }

        setErrors({
          username: errors.username,
          email: msg,
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
          email: errors.email,
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
            type='text'
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
        <button className='button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
