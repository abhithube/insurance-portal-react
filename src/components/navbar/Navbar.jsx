import { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, removeAuthentication } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = async () => {
    await Auth.signOut();
    removeAuthentication();

    history.push({
      pathname: '/login',
      state: {
        alert: { type: 'success', message: 'Logged out successfully' },
      },
    });
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
            <NavLink className='navbar-link' to='/plans'>
              Plans
            </NavLink>
            <NavLink className='navbar-link' to='/about'>
              About
            </NavLink>
          </div>
          <div id='navbar-right'>
            {isAuthenticated ? (
              <>
                <NavLink className='navbar-link' to='/profile'>
                  Profile
                </NavLink>
                <button className='navbar-link' onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink className='navbar-link' to='/login'>
                  Login
                </NavLink>
                <NavLink className='navbar-link' to='/register'>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
