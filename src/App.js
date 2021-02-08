import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import Navbar from './components/navbar/Navbar';
import AuthContextProvider from './contexts/AuthContext';
import './App.css';
import RegisterPage from './components/register/RegisterPage';

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
            </Switch>
          </div>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
