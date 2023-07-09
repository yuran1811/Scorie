import { DivProps } from '@/shared';
import { usePanel } from '@/contexts';
import { BackIcon } from '@cpns/icons';
import { SettingInfo } from './SettingInfo';
import { FC } from 'react';

const SettingPanel: FC<DivProps> = ({ className = '' }) => {
  const { active, setActive } = usePanel();

  return (
    <div
      className={`${
        active.isSetting ? 'translate-y-0' : 'translate-y-[200%]'
      } isAnimated fullscreen z-20 bg-violet-800/95 px-12 py-20 text-ctcolor medtab:max-w-[50rem] ${className}`}
    >
      <BackIcon onClick={() => setActive && setActive((s) => ({ ...s, isSetting: false }))} />
      <SettingInfo />
    </div>
  );
};

export default SettingPanel;
