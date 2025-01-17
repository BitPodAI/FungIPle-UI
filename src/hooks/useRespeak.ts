import { chatApi } from '@/services/chat';
import { toast } from 'react-toastify';

const useRespeak = () => {
  const notify = () => toast('Regenerating...');
  const prefix = "handleRespeaktext-";

  const handleRespeakClick = async (text: string): Promise<string>  => {
    console.log("handleTranslateClick req: ", text);
    if (!text || text.trim() === '') {
      console.log("Regenerating failed: no content text.");
      throw new Error('Regenerating failed: no content text.');
    }

    let textIsKey = prefix +  text.slice(0, 100);
    let valueIsPrompt = sessionStorage.getItem(textIsKey);

    if (!valueIsPrompt) {
      console.log("Regenerating failed: no prompt.");
      throw new Error('Regenerating failed: no prompt.');
    }
    console.log("Regenerating, prompt: ", valueIsPrompt);

    notify();
    try {
      let res = await chatApi.createChat(valueIsPrompt);
      console.log("Regenerating, res: ", res.text);
      sessionStorage.removeItem(textIsKey);
      return res.text;
    } catch (error) {
      console.error('Translation failed:', error);
    }
    return "";
  };

  const cacheChatPromtp = async (prompt: string, response: string)  => {
    let textIsKey2 = prefix +  response.slice(0, 100);
    sessionStorage.setItem(textIsKey2, prompt);
  }


  return {
    handleRespeakClick,
    cacheChatPromtp
  };
};

export default useRespeak;
