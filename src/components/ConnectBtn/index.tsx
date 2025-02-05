import { useUserStore } from '@/stores/useUserStore';
import PixModal from '../common/PixModal';
import ShortButton from '@/pages/Chat/components/ShortButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import walletIcon from '@/assets/icons/wallet.svg';
import { usePrivy } from '@privy-io/react-auth';
import { authService } from '@/services/auth';
import { isWeb } from '@/utils/config';
import './index.less'

const HOST_URL = import.meta.env.VITE_API_HOST_URL;

const ConnectBtn = () => {
  const { userProfile, setUserProfile } = useUserStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { connectWallet, user } = usePrivy();
  console.warn(user);

  const handleWalletConnect = async () => {
    if (userProfile?.walletAddress) {
      return;
    }
    if (isWeb()) {
      if (userProfile?.userId) {
        connectWallet();
      } else {
        setIsModalOpen(true);
      }
    } else {
      if (userProfile?.gmail) {
        window.open(`${HOST_URL}/#/popup-wallet`, 'popup', 'width=600,height=600,status=yes,scrollbars=yes');
      } else {
        // Popup tips
        //localStorage.clear();
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsModalOpen(false);
  };

  // Get the wallet address
  const updateWalletAddress = async (address: string) => {
    try {
      if (userProfile) {
        const updatedProfile = { ...userProfile, walletAddress: address };
        setUserProfile(updatedProfile);
        await authService.updateProfile(updatedProfile.userId, updatedProfile);
      }
    } catch (error) {
      console.error('Failed to update wallet address:', error);
    }
  };

  // Message from parent
  const handleWalletMessage = async (event: MessageEvent) => {
    //console.warn('handleWalletMessage', event);
    const { type, data } = event.data;

    // LINK_WALLET_SUCCESS
    if (type === 'LINK_WALLET_SUCCESS' && data) {
      await updateWalletAddress(data);
    }

    //if (user && user.wallet && user.wallet.address) {
    //  await updateWalletAddress(user.wallet.address);
    //}
  };

  useEffect(() => {
    // Listen the message from parent
    window.addEventListener('message', handleWalletMessage);

    // clean message listener
    return () => {
      window.removeEventListener('message', handleWalletMessage);
    };
  }, [user, userProfile]);

  return (
    <>
      <PixModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4 max-w-[400px] Gantari">
          <h2 className="text-center my-0">Login Tips</h2>
          <h3 className="text-center my-10">Please login firstly before connect wallet.</h3>
          <div className="flex justify-center gap-4">
            <ShortButton
              onClick={() => {
                navigate('/login');
              }}
              className="text-black text-center"
            >
              Login
            </ShortButton>
            <ShortButton onClick={closeModal} className="text-black text-center">
              Cancel
            </ShortButton>
          </div>
        </div>
      </PixModal>
      <div
        className="connect-btn ml-[10px]  max-w-[180px] flex items-center justify-around gap-2 box-border border-black border-solid rounded-xl px-4 py-2 Gantari bg-white"
        onClick={handleWalletConnect}
      >
        <img src={walletIcon} alt="wallet" className="w-[20px] h-[20px] object-contain link-cursor" />
        {userProfile?.walletAddress ? (
          <span className="capitalize text-black text-xs ellipsis Geologica">{userProfile.walletAddress}</span>
        ) : (
          <span className="capitalize text-black text-xs Geologica">connect</span>
        )}
        <div
          className="connect-btn-child flex items-center justify-around box-border border-black border-solid rounded-xl px-4 py-2 Gantari"
          onClick={handleWalletConnect}
        >
          Disconnect
        </div>
      </div>
    </>
  );
};

export default ConnectBtn;
