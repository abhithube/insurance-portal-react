import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import PlansPage from './components/plans/PlansPage';
import PaymentPage from './components/payment/PaymentPage';
import AuthContextProvider from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthContextProvider>
          <Navbar />
          <div id='main-content'>
            <Switch>
              <Route path='/login'>
                <LoginPage />
              </Route>
              <Route path='/register'>
                <RegisterPage />
              </Route>
              <Route path='/plans'>
                <PlansPage />
              </Route>
              <Route path='/payment'>
                <PaymentPage />
              </Route>
            </Switch>
          </div>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
