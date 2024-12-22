import { MAIN_NAVS, EXTEND_NAVS, OTHER_NAVS } from '@/constant/navs';
import ChatIcon from '@/assets/icons/chat.svg';
import AgentIcon from '@/assets/icons/agent.svg';
import WatchListIcon from '@/assets/icons/watch-list.svg';
import DiscoverIcon from '@/assets/icons/discover.svg';
import MemoIcon from '@/assets/icons/memo.svg';
import MoreIcon from '@/assets/icons/more.svg';
import GiftIcon from '@/assets/icons/gift.svg';
import DeviceIcon from '@/assets/icons/device.svg';
import HelpIcon from '@/assets/icons/help.svg';
import SettingIcon from '@/assets/icons/setting.svg';

const mainNavs = [
  {
    title: MAIN_NAVS.CHAT,
    icon: <img src={ChatIcon} alt="chat" />,
    path: '/chat',
  },
  {
    title: MAIN_NAVS.AGENT,
    icon: <img src={AgentIcon} alt="agent" />,
    path: '/agent',
  },
  {
    title: MAIN_NAVS.WATCH_LIST,
    icon: <img src={WatchListIcon} alt="watch-list" />,
    path: '/watch-list',
  },
  {
    title: MAIN_NAVS.DISCOVER,
    icon: <img src={DiscoverIcon} alt="discover" />,
    path: '/discover',
  },
];

const extendNavs = [
  {
    title: EXTEND_NAVS.MEMO,
    icon: <img src={MemoIcon} alt="memo" />,
    path: '/memo',
  },
  {
    title: EXTEND_NAVS.MORE,
    icon: <img src={MoreIcon} alt="more" />,
    path: '/more',
  },
];

const otherNavs = [
  {
    title: OTHER_NAVS.GIFT,
    icon: <img src={GiftIcon} alt="gift" />,
    path: '/gift',
  },
  {
    title: OTHER_NAVS.DEVICE,
    icon: <img src={DeviceIcon} alt="device" />,
    path: '/device',
  },
  {
    title: OTHER_NAVS.HELP,
    icon: <img src={HelpIcon} alt="help" />,
    path: '/help',
  },
  {
    title: OTHER_NAVS.SETTING,
    icon: <img src={SettingIcon} alt="setting" />,
    path: '/setting',
  },
];

export { mainNavs, extendNavs, otherNavs };
