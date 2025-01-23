import React from 'react';
import FileSVG from '@/assets/icons/file.svg';
import ShareSVG from '@/assets/icons/share.svg';
import CopySVG from '@/assets/icons/copy.svg';
import HYTickSVG from '@/assets/icons/hy_tick.svg';
import { ReactSVG } from 'react-svg';
import useShare from '@/hooks/useShare';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { Memo } from '@/types/memo';

interface MemoItemProps {
  data: Memo;
  checked: boolean;
  onCheck: (checked: boolean) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const MemoItem: React.FC<MemoItemProps> = ({ data, checked, onCheck }) => {
  const { handleShareClick } = useShare();
  const { copy, isCopied } = useCopyToClipboard();

  const handleCopy = async (text: string) => {
    await copy(text);
  };

  return (
    <div className="my-4 bg-[#F5F5F560] border-b border-gray-200 rounded-2xl py-4 pb-0 flex flex-col items-start">
      <div className="flex items-start w-full box-border p-x-[10px]">
        <input type="checkbox" className="w-5 h-5 mr-4 cursor-pointer" checked={checked} onChange={e => onCheck(e.target.checked)} />
        {/* {imageUrl && <img src={imageUrl} alt={title} className="w-16 h-16 rounded mr-4" />} */}
        {/* <div className="flex-1">
          <h3 className="Geologica font-bold averia-serif-libre text-normal mt-0 mb-4">{title}</h3>
          <p className="Geologica text-sm averia-serif-libre text-gray-600">{content}</p>
        </div> */}
        <div className="flex-1 Geologica">{data.content}</div>
      </div>
      <div className="w-full box-border flex items-center justify-between mt-2 bg-[#E7E6E650] p-2 rounded-bl-2xl rounded-br-2xl">
        <div className="frc-center gap-4 pl-[12px]">
          <img src={FileSVG} className="w-4 h-4" />
          <span className="text-xs averia-serif-libre text-gray-500">Note · {formatDate(data.id)}</span>
        </div>
        <div className="frc-center gap-4 mr-4">
          <ReactSVG src={ShareSVG} className="text-gray-400 hover:text-gray-600" onClick={() => handleShareClick(data.content)} />
          {!isCopied ? (
            <ReactSVG src={CopySVG} className="text-gray-400 hover:text-gray-500" onClick={() => handleCopy(data.content)} />
          ) : (
            <ReactSVG src={HYTickSVG} className="w-[15px] h-[24px] text-green-400 hover:text-green-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoItem;
