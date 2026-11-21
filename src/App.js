import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Alert from './components/Alert';
import About from './components/About';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [mode, setMode] = useState('dark');
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState(
    window.location.pathname === '/about' ? 'about' : 'home'
  );
  const alertId = useRef(0);

  useEffect(() => {
    const handlePopState = () => {
      setPage(window.location.pathname === '/about' ? 'about' : 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (nextPage) => {
    const path = nextPage === 'about' ? '/about' : '/';
    window.history.pushState({}, '', path);
    setPage(nextPage);
  };

  const toggleMode = () => {
    const nextMode = mode === 'dark' ? 'light' : 'dark';
    setMode(nextMode);
  };

  const showAlert = (message, type = 'success') => {
    alertId.current += 1;
    setAlert({ message, type, id: alertId.current });
  };

  const dismissAlert = useCallback(() => setAlert(null), []);

  return (
    <div className={`app app-${mode}`}>
      <Navbar mode={mode} toggleMode={toggleMode} showAlert={showAlert} navigate={navigate} />
      <Alert alert={alert} onClose={dismissAlert} />
      {page === 'about' ? (
        <About />
      ) : (
        <div className="container textutils-container">
          <Form heading="Enter the text to analyze below" showAlert={showAlert} />
        </div>
      )}
    </div>
  );
}

export default App;