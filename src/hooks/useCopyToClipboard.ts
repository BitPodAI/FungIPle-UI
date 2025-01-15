import { useState } from 'react';

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string) => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not available');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return { copy, isCopied, copiedText };
};

export default useCopyToClipboard;
