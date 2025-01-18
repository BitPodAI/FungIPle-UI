import React from 'react';

interface PixBorderProps {
  top: string;
  bottom: string;
  left: string;
  right: string;
  className?: string;
  children: React.ReactNode;
  height?: number;
  width?: number;
}

const PixBorder: React.FC<PixBorderProps> = ({ width, height, top, bottom, left, right, className, children }) => {
  return (
    <div className={`relative m-[16px] p-[16px] ${className}`}>
      <img
        src={top}
        alt="top"
        className="absolute top-0 left-[12px] right-0 w-[calc(100%-24px)] h-[3px]"
        style={{
          height: height ? 2 : 3,
          width: width ? `calc(100% - 24px + ${width * 2}px)` : `calc(100% - 24px)`,
          left: width ? `${width * 2 - 12}px` : `12px`,
        }}
      />
      <img
        src={bottom}
        alt="bottom"
        className="absolute bottom-0 left-[12px] right-0 w-[calc(100%-24px)] h-[7px]"
        style={{
          height: height ? 4 : 7,
          width: width ? `calc(100% - 24px + ${width * 2}px)` : `calc(100% - 24px)`,
          left: width ? `${width * 2 - 12}px` : `12px`,
        }}
      />
      <img src={left} alt="left" className="absolute top-0 bottom-0 left-0 h-full w-[12px]" style={{ height, width }} />
      <img src={right} alt="right" className="absolute top-0 bottom-0 right-0 h-full w-[12px]" style={{ height, width }} />
      <div className="relative">{children}</div>
    </div>
  );
};

export default PixBorder;
