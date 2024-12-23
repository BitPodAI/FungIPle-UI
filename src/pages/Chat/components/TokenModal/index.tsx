import PixModal from '@/components/common/PixModal';
import Coin from '@/assets/images/agent/coin.png';
import ShortButton from '../ShortButton';

type TokenModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <PixModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-[12px] font-bold fcc-center">
          <span>Congratulations!</span>
          <span> You Got 7 $Ai16z Tokens.</span>
        </h1>
        <img src={Coin} alt="gift-box" className="w-[72px] h-[72px]" />
        <ShortButton onClick={onConfirm} className="text-black">
          OK!
        </ShortButton>
      </div>
    </PixModal>
  );
};

export default TokenModal;
