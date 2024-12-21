import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
