import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import { useWindowResize } from './hooks/useWindowResize';
import { LoadingProvider } from './context/LoadingContext';
import './App.css';
import './mock';
import { useUserStore } from './stores/useUserStore';

const App: React.FC = () => {
  const { width } = useWindowResize(500);
  const { setUserProfile } = useUserStore();

  React.useEffect(() => {
    const res = localStorage.getItem('userProfile');
    if (res) {
      setUserProfile(JSON.parse(res));
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--window-width', `${width}px`);
  }, [width]);

  return (
    <LoadingProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LoadingProvider>
  );
};

export default App;
