import AgentHeader from '@/components/agent/AgentHeader';
import xIcon from '@/assets/icons/x.svg';
import telegramIcon from '@/assets/icons/telegram.svg';
import { Menu, MenuButton, MenuItem, MenuItems, Switch } from '@headlessui/react';
import ArrowdownIcon from '@/assets/icons/arrowdown.svg';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { authService } from '@/services/auth';
import PixModal from '@/components/common/PixModal';
import ShortButton from '../Chat/components/ShortButton';

const SocialItem = ({
  icon,
  account,
  onClick,
  onRevoke,
}: {
  icon: React.ReactNode;
  account?: string;
  onClick?: () => void;
  onRevoke?: () => void;
}) => {
  return (
    <div className="flex-1 h-[120px] bg-[#F3F3F3] rounded-[16px] fcc-center gap-[16px]">
      {icon}
      {account ? (
        <span className="green-bg w-[100px] h-[22px] p-1 text-[12px] text-white text-center averia-serif-libre" onClick={onRevoke}>
          {account}
        </span>
      ) : (
        <span className="gray-bg w-[100px] h-[22px] p-1 text-[12px] text-[#737373] text-center averia-serif-libre" onClick={onClick}>
          Go to Link
        </span>
      )}
    </div>
  );
};

const INTERVAL_OPTIONS = ['1h', '2h', '3h', '12h', '24h'];
const IMIATE_OPTIONS = ['elonmusk', 'cz_binance', 'aeyakovenko', 'jessepollak', 'shawmakesmagic', 'everythingempt0'];

const AgentBoard: React.FC = () => {
  const [Xusername, setXusername] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [interval, setInterval] = useState('2h');
  const [imitate, setImitate] = useState('elonmusk');
  //const [tokenUsed, setTokenUsed] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function set_agent_cfg(enabled: boolean, interval: string, imitate: string) {
    try {
      const userId = useUserStore.getState().getUserId();
      if (!userId) {
        throw new Error('User not logged in');
      }

      const profileUpd = {
        agentCfg: { enabled, interval, imitate },
      };

      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        const oldP = JSON.parse(userProfile);
        const updatedProfile = { ...oldP, ...profileUpd };
        await authService.updateProfile(userId, updatedProfile);
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'Failed to update profile');
    }
  }

  const handleToggle = () => {
    set_agent_cfg(!enabled, interval, imitate);
    setEnabled(!enabled);
  };

  const handleSelectionChange = (event: React.MouseEvent<HTMLDivElement>, type: 'interval' | 'imitate') => {
    const target = event.target as HTMLElement;
    const value = target.innerText;
    if (type === 'interval') {
      setInterval(value);
      set_agent_cfg(enabled, value, imitate);
    } else {
      setImitate(value);
      set_agent_cfg(enabled, interval, value);
    }
  };

  const handleTwitterAuth = async () => {
    try {
      // 1. Get URL
      const { url, state } = await authService.twitterOAuth.getAuthUrl();
      // 2. Store state
      sessionStorage.setItem('twitter_oauth_state', state);
      // 3. Open auth window
      authService.twitterOAuth.createAuthWindow(url);
      // 4. Wait for auth result
      await authService.twitterOAuth.listenForAuthMessage();
      const userId = useUserStore.getState().getUserId();
      if (userId) {
        await authService.getProfile(userId);
      }
      const twUsername = useUserStore.getState().getXUsername();
      if (twUsername) {
        setXusername(twUsername);
      } else {
        setXusername('');
      }
    } catch (err) {
      console.error('Twitter auth error:', err);
    }
  };

  const beginRevoke = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsModalOpen(false);
  };

  const handleTwitterAuthRevoke = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await authService.twitterOAuth.handleRevoke();
      const userId = useUserStore.getState().getUserId();
      if (userId) {
        await authService.getProfile(userId);
      }
      const twUsername = useUserStore.getState().getXUsername();
      if (twUsername) {
        setXusername(twUsername);
      } else {
        setXusername('');
      }
      closeModal();
    } catch (err) {
      console.error('Twitter revoke error:', err);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = useUserStore.getState().getUserId();
        if (userId) {
          await authService.getProfile(userId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUserProfile();

    //setTokenUsed(100 + Math.floor(Math.random() * 200));
    const twUsername = useUserStore.getState().getXUsername();
    const accessToken = useUserStore.getState().getXAccessToken();
    if (twUsername && accessToken) {
      setXusername('@' + twUsername);
    } else {
      setXusername('');
    }
    const agentConfig = useUserStore.getState().userProfile?.agentCfg;
    if (agentConfig) {
      const { enabled, interval, imitate } = agentConfig;
      setEnabled(enabled);
      setInterval(interval);
      setImitate(imitate);
    }
  }, [Xusername]);

  return (
    <div className="page press-start-2p max-w-[490px]">
      <AgentHeader />

      <PixModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4 max-w-[400px] averia-serif-libre">
          <h2 className="text-center my-0">Revoke Twitter Authorization</h2>
          <h3 className="text-center my-10">Confirm to Revoke the Twitter Authorization?</h3>
          <div className="flex justify-center gap-4">
            <ShortButton
              onClick={(e: React.MouseEvent) => {
                handleTwitterAuthRevoke(e);
              }}
              className="text-black text-center"
            >
              Yes
            </ShortButton>
            <ShortButton onClick={closeModal} className="text-black text-center">
              No
            </ShortButton>
          </div>
        </div>
      </PixModal>

      <div className="w-[calc(100%-40px)] mx-[20px]">
        <div className="w-full mt-[20px] frc-center gap-[16px]">
          <SocialItem icon={<img src={xIcon} />} account={Xusername} onClick={handleTwitterAuth} onRevoke={beginRevoke} />
          <SocialItem icon={<img src={telegramIcon} />} />
        </div>

        <div className="w-full mt-[20px]">
          <div className="flex items-center justify-between averia-serif-libre">
            <span className="text-[14px]">X Takeover by Agent </span>
            <Switch
              checked={enabled}
              onChange={handleToggle}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-[#39CE78]"
            >
              <span className="size-4 rounded-full bg-white transition group-data-[checked]:translate-x-4" />
            </Switch>
          </div>
        </div>
        <form className="mt-[20px] bg-[#F3F3F3] rounded-[24px] p-[24px] averia-serif-libre">
          <div className="mb-[20px] w-full flex flex-col items-start justify-start gap-[16px] averia-serif-libre">
            <span className="text-[14px]">Post interval</span>
            <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
              <Menu>
                <MenuButton className="flex justify-between flex-1 items-center h-[38px] px-0 bg-[#FFFFFF]">
                  <span className="text-black flex-1 flex items-center justify-start gap-2 p-1.5 rounded-lg data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                    {interval}
                  </span>
                  <img src={ArrowdownIcon} alt="arrowdown" className="w-[10px] h-[10px]" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="select-none rounded-xl bg-white w-[336px] translate-x-[25px] p-[2px] transition duration-100 ease-out border-3 border-solid border-[#E3E3E3]"
                  onMouseUp={event => handleSelectionChange(event, 'interval')}
                >
                  {INTERVAL_OPTIONS.map(option => (
                    <MenuItem key={option} as="div">
                      <div className="flex items-center gap-2 text-[12px] text-black press-start-2p rounded-lg py-1.5 px-3 pl-[30px] data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3] averia-serif-libre">
                        {option}
                      </div>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[16px] averia-serif-libre">
            <span className="text-[14px] averia-serif-libre">Imitate @</span>
            <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
              <Menu>
                <MenuButton className="flex justify-between flex-1 items-center h-[38px] px-0 bg-[#FFFFFF]">
                  <span className="text-black flex-1 flex items-center justify-start gap-2 p-1.5 rounded-lg data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                    {imitate}
                  </span>
                  <img src={ArrowdownIcon} alt="arrowdown" className="w-[10px] h-[10px]" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="select-none rounded-xl bg-white w-[336px] translate-x-[25px] p-[2px] transition duration-100 ease-out border-3 border-solid border-[#E3E3E3]"
                  onMouseUp={event => handleSelectionChange(event, 'imitate')}
                >
                  {IMIATE_OPTIONS.map(option => (
                    <MenuItem key={option} as="div">
                      <div className="flex items-center gap-2 text-[12px] text-black press-start-2p rounded-lg py-1.5 px-3 pl-[30px] data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3] averia-serif-libre">
                        {option}
                      </div>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentBoard;
