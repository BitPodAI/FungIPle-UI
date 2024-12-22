import IconWrap from '@/components/common/IconWrap';
import { Link } from 'react-router-dom';
import { mainNavs, extendNavs, otherNavs } from './config';

const Sidebar = () => {
  return (
    <div className="w-[60px] h-screen flex flex-col justify-between items-center">
      <div className="fcc-center">
        <ul>
          {mainNavs.map(nav => (
            <li key={nav.title}>
              <Link to={nav.path}>
                <IconWrap title={nav.title} isSelected={false} onClick={() => {}}>
                  {nav.icon}
                </IconWrap>
              </Link>
            </li>
          ))}
        </ul>
        <div>——</div>
        <ul>
          {extendNavs.map(nav => (
            <li key={nav.title}>
              <Link to={nav.path}>
                <IconWrap title={nav.title} isSelected={false} onClick={() => {}}>
                  {nav.icon}
                </IconWrap>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="fcc-center">
        <ul>
          {otherNavs.map(nav => (
            <li key={nav.title}>
              <Link to={nav.path}>
                <IconWrap title={nav.title} isSelected={false} onClick={() => {}}>
                  {nav.icon}
                </IconWrap>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
