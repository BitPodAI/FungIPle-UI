import PixModal from '@/components/common/PixModal';
import Coin from '@/assets/images/agent/coin.png';
import ShortButton from '../ShortButton';
import { authService } from '@/services/auth';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect } from 'react';

type TokenModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onConfirm, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const uID = useUserStore.getState().getUserId();
    if (!uID) {
      throw new Error('User not logged in');
    }
    if (isOpen) {
      // Define transfer data
      const transferData = {
        typestr: 'sol-spl',
        userId: uID,
      };

      // Call transferSol function
      authService
        .transferSol(transferData)
        .then(response => {
          console.log('transferSol successful:', response);
        })
        .catch(error => {
          console.error('transferSol failed:', error);
        });
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <PixModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-[12px] font-bold fcc-center">
          <span>Congratulations!</span>
          <span> You Got 7 $Ai16z Tokens.</span>
        </h1>
        <img src={Coin} alt="gift-box" className="w-[72px] h-[72px]" />
        <ShortButton
          onClick={async () => {
            await onConfirm();
          }}
          className="text-black"
        >
          OK!
        </ShortButton>
      </div>
    </PixModal>
  );
};

export default TokenModal;
