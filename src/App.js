import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthContextProvider>
          <Navbar />
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
