import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const PluginLayout = () => {
  return (
    <div className="flex justify-between items-center w-full h-full press-start-2p bg-white">
      <Outlet />
      <Sidebar />
    </div>
  );
};

export default PluginLayout;
