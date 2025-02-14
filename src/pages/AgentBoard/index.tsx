import AgentHeader from '@/components/agent/AgentHeader';
import xIcon from '@/assets/icons/x.svg';
import SearchIcon from '@/assets/icons/search.png';
import telegramIcon from '@/assets/icons/telegram.svg';
import { Menu, MenuButton, MenuItem, MenuItems, Switch } from '@headlessui/react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
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
    <div className="flex-1 h-[120px] bg-[#F3F3F3] rounded-[16px] fcc-center gap-[16px] ">
      {icon}
      {account ? (
        <span
          className="btn-scale green-bg px-[16px] min-w-[100px] h-[22px] line-height-[22px] p-1 text-[12px] text-white text-center"
          onClick={onRevoke}
        >
          {account}
        </span>
      ) : (
        <span
          className="btn-scale gray-bg px-[16px] min-w-[100px] h-[22px] line-height-[22px] p-1 text-[12px] text-[#737373] text-center"
          onClick={onClick}
        >
          Go to Link
        </span>
      )}
    </div>
  );
};

const INTERVAL_OPTIONS = ['1h', '2h', '3h', '12h', '24h'];
const IMIATE_OPTIONS = ['elonmusk', 'cz_binance', 'aeyakovenko', 'jessepollak', 'shawmakesmagic', 'everythingempt0'];

const AgentBoard: React.FC = () => {
  const { userProfile } = useUserStore();
  const [Xusername, setXusername] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [interval, setInterval] = useState('2h');
  const [imitate, setImitate] = useState('elonmusk');
  //const [tokenUsed, setTokenUsed] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTgModalOpen, setIsTgModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === '' ? IMIATE_OPTIONS : IMIATE_OPTIONS.filter(option => option.toLowerCase().includes(query.toLowerCase()));
  console.warn(filteredOptions);

  async function set_agent_cfg(enabled: boolean, interval: string, imitate: string) {
    try {
      const userId = useUserStore.getState().getUserId();
      if (!userId) {
        throw new Error('User not logged in');
      }

      const profileUpd = {
        agentCfg: { enabled, interval, imitate },
      };

      if (userProfile) {
        const oldP = userProfile; // JSON.parse(userProfile);
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
  const handleImitateSelectionChange = (value: string) => {
    setImitate(value);
    set_agent_cfg(enabled, interval, value);
  };

  const handleTelegramAuth = async () => {
    console.warn(1111);

    setIsTgModalOpen(true);
  };
  const closeTgModal = async () => {
    setIsTgModalOpen(false);
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
    <div className="page press-start-2p max-w-[450px] Geologica">
      <AgentHeader />

      <PixModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4 max-w-[400px]">
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
      <PixModal isOpen={isTgModalOpen} onClose={closeTgModal}>
        <div className="flex flex-col gap-4 max-w-[400px]">
          {/* <h2 className="text-center my-0">Revoke Twitter Authorization</h2> */}
          <h2 className="text-center my-10">Coming Soon</h2>
          <div className="flex justify-center gap-4">
            <ShortButton
              onClick={closeTgModal}
              className="text-black text-center"
            >
              Yes
            </ShortButton>
          </div>
        </div>
      </PixModal>

      <div className="w-[calc(100%-40px)] mx-[20px]">
        <div className="w-full mt-[27px] frc-center gap-[16px]">
          <SocialItem icon={<img src={xIcon} />} account={Xusername} onClick={handleTwitterAuth} onRevoke={beginRevoke} />
          <SocialItem icon={<img src={telegramIcon} />} onClick={handleTelegramAuth} />
        </div>

        <div className="w-full mt-[20px]">
          <div className="flex items-center justify-between">
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
        <form className="mt-[20px] bg-[#F3F3F3] rounded-[24px] p-[24px]">
          <div className="mb-[20px] w-full flex flex-col items-start justify-start gap-[16px]">
            <span className="text-[14px]">Post interval</span>
            <div className="pix-input  w-[290px] h-[48px] px-[28px] frc-start">
              <Menu>
                <MenuButton className="flex justify-between flex-1 items-center h-[38px] px-0 bg-[#FFFFFF]">
                  <span className="Geologica text-[14px] text-black flex-1 flex items-center justify-start gap-2 p-1.5 rounded-lg data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                    {interval}
                  </span>
                  <img src={ArrowdownIcon} alt="arrowdown" className="w-[10px] h-[10px] ml-[10px]" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="select-none rounded-xl bg-white w-[336px] translate-x-[25px] p-[2px] transition duration-100 ease-out border-3 border-solid border-[#E3E3E3]"
                  onMouseUp={event => handleSelectionChange(event, 'interval')}
                >
                  {INTERVAL_OPTIONS.map(option => (
                    <MenuItem key={option} as="div">
                      <div className="Geologica flex items-center gap-2 text-[13px] text-black press-start-2p rounded-lg py-1.5 px-3 pl-[30px] data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                        {option}
                      </div>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[16px]">
            <span className="text-[14px]">Imitate @</span>
            <div className="pix-input  w-[292px] h-[48px] px-[28px] frc-start pl-[26px]">
              <img src={SearchIcon} className="w-[20px] mr-[18px]" />
              <Combobox as="div" value={imitate} onChange={handleImitateSelectionChange} className="w-full">
                <div className="relative ">
                  <ComboboxInput
                    className="Geologica text-[14px] text-black flex-1 flex items-center justify-start gap-2 p-1.5 rounded-lg border border-gray-300 focus:outline-none  data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]"
                    style={{ width: 'calc(100% - 30px)' }}
                    placeholder="Search"
                    onChange={e => setQuery(e.target.value)}
                  />
                  <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-0 bg-[#FFFFFF]">
                    <img src={ArrowdownIcon} alt="arrowdown" className="w-[10px] h-[10px]" />
                  </ComboboxButton>

                  <ComboboxOptions className="absolute z-10 w-full mt-1 bg-white rounded-xl border border-[#E3E3E3] shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length === 0 && query !== '' ? (
                      <div className="p-2 text-center text-gray-500">No results found</div>
                    ) : (
                      filteredOptions.map(option => (
                        <ComboboxOption key={option} value={option}>
                          {({ active }) => (
                            <div
                              className={`Geologica flex items-center gap-2 text-[12px] text-black py-1.5 px-3 pl-[30px] rounded-lg ${
                                active ? 'bg-[#E3E3E3]' : ''
                              }`}
                            >
                              {option}
                            </div>
                          )}
                        </ComboboxOption>
                      ))
                    )}
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentBoard;
