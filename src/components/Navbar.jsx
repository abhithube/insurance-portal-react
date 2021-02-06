import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div id='navbar'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <Link className='navbar-brand' to='/'>
          AT Insurance
        </Link>
        <ul className='navbar-nav'>
          {isLoggedIn() && (
            <li className='nav-item'>
              <Link className='nav-link' to='/dashboard'>
                Dashboard
              </Link>
            </li>
          )}
          <li className='nav-item'>
            <Link className='nav-link' to='/plans'>
              Plans
            </Link>
          </li>
        </ul>
        {isLoggedIn() ? (
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/profile'>
                My Profile
              </Link>
            </li>
            <li className='nav-item'>
              <button className='nav-link btn' onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/login'>
                Login
              </Link>
            </li>
            <li id='register-tab' className='nav-item'>
              <Link className='nav-link' to='/register'>
                Register
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
