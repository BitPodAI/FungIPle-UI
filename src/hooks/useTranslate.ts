import { watchApi } from '@/services/watch';
import { toast } from 'react-toastify';

const useTranslate = () => {
  const notify = () => toast('Translating');
  function isAllUpperCase(str) {
    const regex = /^[A-Z]+$/;
    return regex.test(str);
}
  const handleTranslateClick = async (text: string): Promise<string>  => {
    console.log("handleTranslateClick req: ", text);
    notify();
    if (!text || text.trim() === '') {
      console.warn('Translation text is empty or invalid');
      return "";
    }
    try {
      let finalText = "";
      let [firstPart, secondPart] = text.split(":");
      const parts = text.split(":");
      if (parts.length > 2) {
        secondPart = parts.slice(1).join(":");
      }

      if(!firstPart.includes("htpp")&& !firstPart.includes("HTTP") && isAllUpperCase(firstPart) && secondPart) {
        finalText = firstPart;
        let res = await watchApi.translateText(secondPart);
        finalText += ": " + res;
      } else {
        let res = await watchApi.translateText(text);
        finalText = res;
      }
      console.log("handleTranslateClick res: ", finalText);
      return finalText;
    } catch (error) {
      console.error('Translation failed:', error);
    }
    return "";
  };

  return {
    handleTranslateClick,
  };
};

export default useTranslate;
