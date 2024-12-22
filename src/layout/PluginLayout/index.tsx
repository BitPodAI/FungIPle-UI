import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const PluginLayout = () => {
  return (
    <div className="page press-start-2p">
      <Outlet />
      <Sidebar />
    </div>
  );
};

export default PluginLayout;
