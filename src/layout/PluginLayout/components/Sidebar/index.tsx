import IconWrap from '@/components/common/IconWrap';
import { Link } from 'react-router-dom';
import { mainNavs, extendNavs } from './config';
import { useEffect, useState } from 'react';
import { MAIN_NAVS, EXTEND_NAVS, OTHER_NAVS } from '@/constant/navs';
import { useLocation } from 'react-router-dom';
import Close from '@/assets/icons/close2.svg';
import { ReactSVG } from 'react-svg';

const Sidebar = () => {
  const location = useLocation();
  const [selectedNav, setSelectedNav] = useState<string>();
  const isWeb = import.meta.env.VITE_MODE_WEB === '1';
  useEffect(() => {
    // Update selectedNav based on the current route
    const path = location.pathname;
    switch (path) {
      case '/plugin/chat':
        setSelectedNav(MAIN_NAVS.CHAT);
        break;
      case '/plugin/agent':
        setSelectedNav(MAIN_NAVS.AGENT);
        break;
      case '/plugin/watch-list':
        setSelectedNav(MAIN_NAVS.WATCH_LIST);
        break;
      case '/plugin/discover':
        setSelectedNav(MAIN_NAVS.DISCOVER);
        break;
      case '/plugin/memo':
        setSelectedNav(EXTEND_NAVS.MEMO);
        break;
      default:
        setSelectedNav(OTHER_NAVS.HELP);
    }
  }, [location]);

  return (
    <div className="w-[60px] h-screen py-[16px] box-border flex flex-col justify-between items-center bg-[##fafafa]">
      <div className="fcc-center">
        <ul className="fcc-center gap-[20px]">
          {!isWeb && (
            <li className="cursor-pointer">
              <ReactSVG src={Close} onClick={() => window.close()} />
            </li>
          )}
          {mainNavs.map(nav => (
            <li key={nav.title}>
              <Link to={nav.path} className="fcc-center">
                <IconWrap
                  title={nav.title}
                  isShowTitle={false}
                  isSelected={selectedNav === nav.title}
                  onClick={() => {
                    setSelectedNav(nav.title);
                  }}
                >
                  {nav.icon}
                </IconWrap>
                <span className="Gantari text-[11px] color-[#333] mt-[6px]">{nav.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-[24px] h-[1px] bg-[#E3E3E3] mt-[16px] mb-[16px]"></div>
        <ul className="fcc-center gap-[20px]">
          {extendNavs.map(nav => (
            <li key={nav.title}>
              <Link to={nav.path}>
                <IconWrap
                  title={nav.title}
                  isShowTitle={false}
                  isSelected={selectedNav === nav.title}
                  onClick={() => {
                    setSelectedNav(nav.title);
                  }}
                >
                  {nav.icon}
                </IconWrap>
                <span className="Gantari text-[11px] color-[#333] mt-[6px]">{nav.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="fcc-center">
        <ul className="fcc-center gap-[16px]">
          {otherNavs.map(nav => (
            <li key={nav.title}>
              <Link to={nav.path}>
                <IconWrap
                  title={nav.title}
                  isShowTitle={false}
                  isSelected={selectedNav === nav.title}
                  onClick={() => {
                    setSelectedNav(nav.title);
                  }}
                >
                  {nav.icon}
                </IconWrap>
              </Link>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Sidebar;
