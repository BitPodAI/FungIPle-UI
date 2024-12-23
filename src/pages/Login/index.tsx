import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '@/components/common/Background';
import Button from '@/components/common/Button';
import { BTNCOLOR } from '@/constant/button';
import userIcon from '@/assets/icons/user.svg';
import passwordIcon from '@/assets/icons/lock.svg';
import emailIcon from '@/assets/icons/email.svg';
import { LoginForm } from '@/types/auth';
import { authService } from '@/services/auth';
import { useEffect } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
//import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Login: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, connected, disconnect, connect, wallet } = useWallet();

  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!form.username.trim()) {
      setError('Please enter your X account');
      return false;
    }
    if (!form.password.trim()) {
      setError('Please enter your password');
      return false;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await authService.login(form);
      navigate('/egg-select');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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
            //setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
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
      if (wallet && !connected) {
        await connect();
      }
    } catch (error) {
      console.error("Connect Wallet Error: ", error);
    }
  };

  return (
    <div className="page press-start-2p">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full bg-white">
        <Background />
      </div>
      <div className="text-center w-auto min-w-[290px] mx-[50px] mt-[100px] mb-[50px]">
        <h1 className="press-start-2p text-xl">CREATE YOUR OWN</h1>
        <h1 className="press-start-2p text-xl">SOCIAL AGENT</h1>
      </div>
      <form className="fcc-center gap-[20px] box-border mx-[50px]" onSubmit={handleLogin}>
        <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
          <img src={userIcon} alt="x" className="w-[20px] h-[20px]" />
          <div className="w-[1px] h-[16px] bg-[#E3E3E3] mx-[12px]"></div>
          <input
            type="text"
            placeholder="X ACCOUNT"
            className="w-[180px] flex-1 h-full bg-transparent text-sm"
            value={form.username}
            onChange={handleInputChange('username')}
          />
        </div>
        <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
          <img src={passwordIcon} alt="x" className="w-[20px] h-[20px]" />
          <div className="w-[1px] h-[16px] bg-[#E3E3E3] mx-[12px]"></div>
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-[180px] flex-1 h-full bg-transparent text-sm"
            value={form.password}
            onChange={handleInputChange('password')}
          />
        </div>
        <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
          <img src={emailIcon} alt="x" className="w-[20px] h-[20px]" />
          <div className="w-[1px] h-[16px] bg-[#E3E3E3] mx-[12px]"></div>
          <input
            type="email"
            placeholder="EMAIL"
            className="w-[180px] flex-1 h-full bg-transparent text-sm"
            value={form.email}
            onChange={handleInputChange('email')}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
        <Button
          color={BTNCOLOR.ORANGE}
          className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[42px] text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? 'LOGGING IN...' : 'LOG IN'}
        </Button>
      </form>
      <div className="my-[20px]">or</div>
      <div> {connected ? (
        <Button color={BTNCOLOR.PURPLE} className="w-auto min-w-[346px] px-[28px] h-[48px] text-white" type="submit" onClick={disconnect}>
          CHANGE WALLET
        </Button>
        ) : (
        <Button color={BTNCOLOR.PURPLE} className="w-auto min-w-[346px] px-[28px] h-[48px] text-white" type="submit" onClick={handlePhantomLogin}>
          PHANTOM WALLET
        </Button>
        )}
      </div>
    </div>
  );
};

export default Login;

//<WalletModalProvider>
//  <WalletMultiButton />
//</WalletModalProvider>
