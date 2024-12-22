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
    path: '/plugin/chat',
  },
  {
    title: MAIN_NAVS.AGENT,
    icon: <img src={AgentIcon} alt="agent" />,
    path: '/plugin/agent',
  },
  {
    title: MAIN_NAVS.WATCH_LIST,
    icon: <img src={WatchListIcon} alt="watch-list" />,
    path: '/plugin/watch-list',
  },
  {
    title: MAIN_NAVS.DISCOVER,
    icon: <img src={DiscoverIcon} alt="discover" />,
    path: '/plugin/discover',
  },
];

const extendNavs = [
  {
    title: EXTEND_NAVS.MEMO,
    icon: <img src={MemoIcon} alt="memo" />,
    path: '/plugin/memo',
  },
  {
    title: EXTEND_NAVS.MORE,
    icon: <img src={MoreIcon} alt="more" />,
    path: '/plugin/more',
  },
];

const otherNavs = [
  {
    title: OTHER_NAVS.GIFT,
    icon: <img src={GiftIcon} alt="gift" />,
    path: '/plugin/gift',
  },
  {
    title: OTHER_NAVS.DEVICE,
    icon: <img src={DeviceIcon} alt="device" />,
    path: '/plugin/device',
  },
  {
    title: OTHER_NAVS.HELP,
    icon: <img src={HelpIcon} alt="help" />,
    path: '/plugin/help',
  },
  {
    title: OTHER_NAVS.SETTING,
    icon: <img src={SettingIcon} alt="setting" />,
    path: '/plugin/setting',
  },
];

export { mainNavs, extendNavs, otherNavs };
