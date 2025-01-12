import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import { useWindowResize } from './hooks/useWindowResize';
import { LoadingProvider } from './context/LoadingContext';
import './App.css';
import './mock'; // 引入 mock 服务

const App: React.FC = () => {
  const { width } = useWindowResize(500); // 使用200ms的节流时间

  // 根据窗口宽度设置根元素的样式
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
