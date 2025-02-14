import { ethers } from 'ethers';

export const generateWalletAddress = (): string => {
  const wallet = ethers.Wallet.createRandom();
  return wallet.address;
};

export const generatePrivateKey = (): string => {
  const wallet = ethers.Wallet.createRandom();
  return wallet.privateKey;
}; 

export const getChainIdByWallet = (wallet: any): string => {
  let chainId = 'eth';
  try {
    if ('chainId' in wallet) {
      chainId = wallet.chainId || 'eth';
    } else {
      chainId = 'sol'; //TODO: Solana related
    }
    // Diff chain
    if (chainId) {
      if (chainId === 'eip155:8453' || chainId === '8453') {
        chainId = 'base';
      }
      else if (chainId === 'eip155:56' || chainId === '56') {
        chainId = 'bsc';
      }
      else if (chainId === 'eip155:5003' || chainId === '5003') {
        chainId = 'mantle';
      }
      else {
        chainId = 'eth';
      }
    }
  }
  catch (err) {
    console.error(err);
  }
  return chainId;
}