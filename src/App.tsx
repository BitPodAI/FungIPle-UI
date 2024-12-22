import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import { useWindowResize } from './hooks/useWindowResize';
import './App.css';

const App: React.FC = () => {
  const { width } = useWindowResize(200); // 使用200ms的节流时间

  // 根据窗口宽度设置根元素的样式
  React.useEffect(() => {
    document.documentElement.style.setProperty('--window-width', `${width}px`);
  }, [width]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
