import avatarIcon from '@/assets/images/chat/Monkey-4.png';
import walletIcon from '@/assets/icons/wallet.svg';
import lifeBarIcon from '@/assets/icons/life-bar.svg';
import './index.css';
import { useEffect } from "react";
import { useAgentInfo } from '@/hooks/useAgentInfo';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

type AgentHeaderProps = {
  isShowConnect?: boolean;
};

const AgentHeader: React.FC<AgentHeaderProps> = ({ isShowConnect = true }) => {
  const { level, experience, nextLevelExp, agentname } = useAgentInfo();
  const { connection } = useConnection();
  const { publicKey, connected, connect, wallet } = useWallet();

  useEffect(() => {
    const updateConnection = async () => {
      if (!connection || !publicKey) {
        console.log("Wallet not connected or connection unavailable");
        return;
      }
      try {
        connection.onAccountChange(
          publicKey,
          updatedAccountInfo => {
            console.log(updatedAccountInfo);
          },
          "confirmed",
        );
        const accountInfo = await connection.getAccountInfo(publicKey);
        if (accountInfo) {
          console.log(accountInfo);
        } else {
          throw new Error("Account info not found");
        }
      } catch (error) {
        console.error("Failed to retrieve account info:", error);
      }
    };
    updateConnection();
  }, [connection, publicKey]);

  useEffect(() => {
    if (wallet && !connected) {
      connect().catch(error => {
        console.error("Connect Wallet on Effect Error: ", error);
      });
    }
  }, [wallet, connected]);

  const handlePhantomLogin = async() => {
    try {
      //await select("Phantom");
      if (wallet && !connected) {
        await connect();
      }
    } catch (error) {
      console.error("Connect Wallet Error: ", error);
    }
  };

  return (
    <div className="w-[calc(100%-40px)] mx-[20px] mt-[20px] flex items-center justify-between">
      <div className="flex items-center justify-start">
        <div className="relative frc-center agent-stage-avatarwrap">
          <img src={avatarIcon} alt="avatar" className="w-[30px] h-[30px] object-cover" />
        </div>
        <div className="ml-[16px] flex flex-col items-start justify-center gap-1">
          <span className="flex items-center gap-2">
            <span className="text-[12px]">{agentname}</span>
            <span className="text-[12px] text-[#39CE78]">Level {level}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[12px]">Exp</span>
            <span className="relative flex items-center gap-1">
              <img src={lifeBarIcon} alt="life-bar" className="w-[120px] h-[16px] object-cover" />
              <span className="bg-white h-[10px] w-[110px] absolute top-0 left-0 rounded-full ml-4px mr-2px my-2px">
                <span
                  className="bg-[#39CE78] h-[10px] absolute top-0 left-0 rounded-full"
                  style={{ width: `${(experience * 110) / nextLevelExp}px`, transition: 'width 0.3s ease-in-out' }}
                ></span>
              </span>
            </span>
          </span>
        </div>
      </div>
      {isShowConnect && (
        <div className="flex items-center justify-around gap-2 box-border border-1.5 hover:border-2 border-black border-solid rounded-xl px-4 py-2"
          onClick={handlePhantomLogin}>
          <img src={walletIcon} alt="wallet" className="w-[20px] h-[20px] object-contain link-cursor" />
          <span className="capitalize text-black text-xs">connect</span>
        </div>
      )}
    </div>
  );
};

export default AgentHeader;
