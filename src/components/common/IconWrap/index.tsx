type IconWrapProps = {
  children: React.ReactNode;
  isSelected: boolean;
  title?: string;
  isShowTitle?: boolean;
  onClick: () => void;
};

const IconWrap = ({ children, isSelected, title, isShowTitle = true, onClick }: IconWrapProps) => {
  return (
    <div className={`w-[32px] ${isSelected ? 'bg-[#2C2C2C]' : 'bg-white'}`} onClick={onClick}>
      {children}
      {isShowTitle && title && <div className="mt-2 text-[10px] text-center text-black">{title}</div>}
    </div>
  );
};

export default IconWrap;
