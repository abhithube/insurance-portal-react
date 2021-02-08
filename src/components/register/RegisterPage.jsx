import LoginForm from './RegisterForm';
import useQuery from '../../hooks/useQuery';
import './RegisterPage.css';

const RegisterPage = () => {
  const query = useQuery();

  return (
    <div id='register-page'>
      <div id='register-alert'>
        {query.get('invalid') && (
          <span className='alert alert-danger'>Username already taken</span>
        )}
      </div>
      <div id='register-body'>
        <LoginForm />
      </div>
    </div>
  );
};

export default RegisterPage;
