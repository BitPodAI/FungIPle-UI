import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const EggSelect = lazy(() => import('../pages/EggSelect'));
const EggConfig = lazy(() => import('../pages/EggConfig'));
const Chat = lazy(() => import('../pages/Chat'));

const AppRoutes: React.FC = () => {
  return (
    <div className="w-[450px] h-screen light">
      <Suspense fallback={<div className="frc-center w-[450px] h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/egg-select" element={<EggSelect />} />
          <Route path="/egg-config" element={<EggConfig />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="chat" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRoutes;
