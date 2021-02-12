import { Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { setCurrentUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  const history = useHistory();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setCurrentUser(null);
      setIsAuthenticated(false);
      history.push('/login?logout=true');
    } catch (err) {
      return false;
    }
  };

  return (
    <div id='navbar-component'>
      <nav id='navbar'>
        <div id='navbar-header'>
          <Link id='navbar-title' to='/'>
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
      </nav>
    </div>
  );
};

export default Navbar;
