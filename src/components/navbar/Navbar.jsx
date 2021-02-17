import { Fragment, useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, removeAuthentication } = useContext(AuthContext);

  const [redirect, setRedirect] = useState(false);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      removeAuthentication();
      setRedirect(true);
    } catch (err) {
      return false;
    }
  };

  return (
    <div id='navbar-component'>
      <nav id='navbar'>
        <div id='navbar-header'>
          <Link id='navbar-title' to={isAuthenticated ? '/dashboard' : '/'}>
            <i id='logo' className='fas fa-users'></i>
            <span>AT Insurance</span>
          </Link>
        </div>
        <div id='navbar-tabs'>
          <div id='navbar-left'>
            <Link className='navbar-link' to='/plans'>
              Plans
            </Link>
            <Link className='navbar-link' to='/about'>
              About
            </Link>
          </div>
          <div id='navbar-right'>
            {isAuthenticated ? (
              <Fragment>
                <Link className='navbar-link' to='/profile'>
                  Profile
                </Link>
                <button className='navbar-link' onClick={handleLogout}>
                  Logout
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <Link className='navbar-link' to='/login'>
                  Login
                </Link>
                <Link className='navbar-link' to='/register'>
                  Register
                </Link>
              </Fragment>
            )}
          </div>
        </div>
        {redirect && (
          <Redirect
            push
            to={{
              pathname: '/login',
              state: {
                alert: { type: 'success', message: 'Logged out successfully' },
              },
            }}
          />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
