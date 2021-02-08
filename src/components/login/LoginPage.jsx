import LoginForm from './LoginForm';
import useQuery from '../../hooks/useQuery';
import './LoginPage.css';

const LoginPage = () => {
  const query = useQuery();

  return (
    <div id='login-page'>
      <div id='login-alert'>
        {query.get('invalid') && (
          <span className='alert alert-danger'>Invalid credentials</span>
        )}
        {query.get('registered') && (
          <span className='alert alert-success'>
            Account created successfully
          </span>
        )}
        {query.get('unauthorized') && (
          <span className='alert alert-danger'>
            You must be logged in to access this page
          </span>
        )}
        {query.get('logout') && (
          <span className='alert alert-success'>Logged out successfully</span>
        )}
      </div>
      <div id='login-body'>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
