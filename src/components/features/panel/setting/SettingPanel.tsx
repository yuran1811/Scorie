import { DivProps } from '@/shared';
import { usePanel } from '@/contexts';
import { BackIcon } from '@cpns/icons';
import { SettingInfo } from './SettingInfo';
import { FC } from 'react';

const SettingPanel: FC<DivProps> = ({ className }) => {
  const { active, setActive } = usePanel();

  return (
    <div
      className={`${className || ''} ${
        active.isSetting ? 'translate-y-0' : 'translate-y-[200%]'
      } z-20 isAnimated fullscreen px-12 py-20 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
    >
      <BackIcon
        onClick={() =>
          setActive &&
          setActive((s) => ({
            ...s,
            isSetting: false,
          }))
        }
      />

      <SettingInfo />
    </div>
  );
};

export default SettingPanel;
