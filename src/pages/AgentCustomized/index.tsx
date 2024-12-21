import { BTNCOLOR } from '@/constant/button';
import Background from '@/components/common/Background';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import ArrowdownIcon from '@/assets/icons/arrowdown.svg';
import BoyIcon from '@/assets/icons/boy.svg';
import GirlIcon from '@/assets/icons/girl.svg';
import { useState } from 'react';
import { EGG_STYLE, GENDER } from '@/constant/egg';

const AgentCustomized: React.FC = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<GENDER>(GENDER.GIRL);
  const [agentStyle, setAgentStyle] = useState<EGG_STYLE>(EGG_STYLE.EMOTIONAL);

  const handleNext = () => {
    navigate('/egg-config');
  };

  const handleSelectionChange = (event: React.MouseEvent<HTMLDivElement>, type: 'gender' | 'style') => {
    const target = event.target as HTMLElement;
    const value = target.innerText;

    if (value) {
      if (type === 'gender') {
        setGender(value as GENDER);
      } else if (type === 'style') {
        setAgentStyle(value as EGG_STYLE);
      }
    }
  };

  return (
    <div className="page press-start-2p">
      <div className="absolute top-0 left-0 z-[-1] bg-white">
        <Background />
      </div>

      <div className="text-center w-auto min-w-[290px] mx-[20px] mt-[120px] mb-[50px]">
        <h1 className="press-start-2p text-xl">Customized Agent</h1>
      </div>
      <form className="fcc-center gap-[20px] box-border mx-[50px]">
        <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
          <div className="frc-start w-[100px]">
            <div className="w-[75px] text-[12px]">Name</div>
            <div className="w-[1px] h-[16px] bg-[#E3E3E3] mx-[12px]"></div>
          </div>
          <input type="text" placeholder="" className="w-full h-full bg-transparent text-[12px] px-2" />
        </div>
        <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
          <div className="frc-start w-[100px]">
            <div className="w-[75px] text-[12px]">Gender</div>
            <div className="w-[1px] h-[16px] bg-[#E3E3E3] mx-[12px]"></div>
          </div>
          <Menu>
            <MenuButton className="flex justify-between flex-1 items-center h-[48px] px-0">
              {gender === GENDER.BOY ? (
                <div className="text-black flex-1 flex items-center justify-start gap-2 p-1.5 rounded-lg data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                  <img src={BoyIcon} alt="boy" className="w-[16px] h-[16px]" />
                  Boy
                </div>
              ) : (
                <div className="text-black flex-1 flex items-center justify-start gap-2 p-1.5 rounded-lg data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                  <img src={GirlIcon} alt="girl" className="w-[16px] h-[16px]" />
                  Girl
                </div>
              )}
              <img src={ArrowdownIcon} alt="arrowdown" className="w-[10px] h-[10px]" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="select-none rounded-xl bg-white w-[205px] translate-x-[25px] p-[2px] transition duration-100 ease-out border-3 border-solid border-[#E3E3E3]"
              onMouseUp={event => handleSelectionChange(event, 'gender')}
            >
              <MenuItem as="div" data-value="Boy">
                <div className="flex items-center gap-2 text-[12px] text-black press-start-2p rounded-lg py-1.5 px-3 data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                  <img src={BoyIcon} alt="boy" className="w-[16px] h-[16px]" />
                  Boy
                </div>
              </MenuItem>
              <MenuItem as="div" data-value="Girl">
                <div className="flex items-center gap-2 text-[12px] text-black press-start-2p rounded-lg py-1.5 px-3 data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                  <img src={GirlIcon} alt="girl" className="w-[16px] h-[16px]" />
                  Girl
                </div>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
          <div className="frc-start w-[100px]">
            <div className="w-[75px] text-[12px]">Style</div>
            <div className="w-[1px] h-[16px] bg-[#E3E3E3] mx-[12px]"></div>
          </div>
          <Menu>
            <MenuButton className="flex justify-between flex-1 items-center h-[48px] px-0">
              <div className="text-black flex-1 flex items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                {agentStyle}
              </div>
              <img src={ArrowdownIcon} alt="arrowdown" className="w-[10px] h-[10px]" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="select-none rounded-xl bg-white w-[205px] translate-x-[25px] p-[2px] transition duration-100 ease-out border-3 border-solid border-[#E3E3E3]"
              onMouseUp={event => handleSelectionChange(event, 'style')}
            >
              {Object.values(EGG_STYLE).map(style => (
                <MenuItem as="div" data-value={style} key={style}>
                  <div className="flex items-center gap-2 text-[12px] text-black press-start-2p rounded-lg py-1.5 px-3 data-[focus]:bg-[#E3E3E3] hover:bg-[#E3E3E3]">
                    {style}
                  </div>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
        <Button color={BTNCOLOR.BLACK} className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[60px]" type="submit" onClick={handleNext}>
          Welcome!
        </Button>
      </form>
    </div>
  );
};

export default AgentCustomized;
