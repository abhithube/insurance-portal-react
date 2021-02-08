import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { loggedIn, logout } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = async () => {
    const success = await logout();
    if (success) history.push('/login?logout');
  };

  return (
    <div id='navbar'>
      <nav className='navbar navbar-expand-lg'>
        <Link className='navbar-brand' to='/'>
          <i id='logo' className='fas fa-users'></i>
          <span>AT Insurance</span>
        </Link>
        <ul className='navbar-nav'>
          {loggedIn && (
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
        {loggedIn ? (
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/profile'>
                Profile
              </Link>
            </li>
            <li className='nav-item'>
              <button className='nav-link btn' onClick={handleLogout}>
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
