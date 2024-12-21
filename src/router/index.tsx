import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const EggSelect = lazy(() => import('../pages/EggSelect'));
const EggConfig = lazy(() => import('../pages/EggConfig'));
const Chat = lazy(() => import('../pages/Chat'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-[320px] h-[600px] bg-gradient-to-r from-[#f06daf] to-[#2da1ff] text-xl text-white">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/egg-select" element={<EggSelect />} />
        <Route path="/egg-config" element={<EggConfig />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="chat" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
