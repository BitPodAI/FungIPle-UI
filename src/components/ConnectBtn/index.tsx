import { useUserStore } from '@/stores/useUserStore';
import PixModal from '../common/PixModal';
import ShortButton from '@/pages/Chat/components/ShortButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import walletIcon from '@/assets/icons/wallet.svg';

const HOST_URL = import.meta.env.VITE_API_HOST_URL;

const ConnectBtn = () => {
  const { userProfile } = useUserStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWalletConnect = async () => {
    if (userProfile?.gmail) {
      window.open(`${HOST_URL}/#/popup-wallet`, 'popup', 'width=600,height=600,status=yes,scrollbars=yes');
    } else {
      // Popup tips
      setIsModalOpen(true);
    }
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <>
      <PixModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4 max-w-[400px] averia-serif-libre">
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
      <div className="flex items-center justify-around gap-2 box-border border-1.5 hover:border-2 border-black border-solid rounded-xl px-4 py-2 averia-serif-libre bg-white">
        <img src={walletIcon} alt="wallet" className="w-[20px] h-[20px] object-contain link-cursor" />
        {userProfile?.walletAddress ? (
          <span className="capitalize text-black text-xs ellipsis">{userProfile.walletAddress}</span>
        ) : (
          <span onClick={handleWalletConnect} className="capitalize text-black text-xs">
            connect
          </span>
        )}
      </div>
    </>
  );
};

export default ConnectBtn;
