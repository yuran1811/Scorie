import { DivProps } from '@/shared';
import { usePanel } from '@/contexts';
import { BackIcon } from '@cpns/icons';
import { DocInfo } from './DocInfo';
import { FC } from 'react';

const DocPanel: FC<DivProps> = ({ className = '' }) => {
  const { active, setActive } = usePanel();

  return (
    <div
      className={`${
        active.isDoc ? 'translate-x-0' : 'translate-x-[-200%]'
      } isAnimated fullscreen medtab:max-w-[50rem] z-20 bg-ctcolor px-4 py-20 text-ctbg lgmb:px-12 ${className}`}
    >
      <BackIcon onClick={() => setActive && setActive((s) => ({ ...s, isDoc: false }))} />
      <DocInfo />
    </div>
  );
};

export default DocPanel;
