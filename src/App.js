import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';

import ProtectedRoute from './components/util/ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import PlansPage from './components/plans/PlansPage';
import ProfilePage from './components/profile/ProfilePage';
import PaymentPage from './components/payment/PaymentPage';
import AuthContextProvider from './contexts/AuthContext';
import './App.css';

Amplify.configure({
  Auth: {
    region: 'us-west-2',
    userPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
  },
});

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthContextProvider>
          <Navbar />
          <div id='main-content'>
            <Switch>
              <Route path='/login' component={LoginPage} />
              <Route path='/register' component={RegisterPage} />
              <Route path='/plans' component={PlansPage} />
              <ProtectedRoute path='/profile' component={ProfilePage} />
              <ProtectedRoute path='/payment' component={PaymentPage} />
            </Switch>
          </div>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
