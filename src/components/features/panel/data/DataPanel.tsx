import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { BackIcon } from '@cpns/icons';
import { FC } from 'react';
import { DataInfo } from './DataInfo';

const DataPanel: FC<DivProps> = ({ className = '' }) => {
  const { active, setActive } = usePanel();

  return (
    <div
      className={`${
        active.isData ? 'translate-y-0' : 'translate-y-[200%]'
      } isAnimated fullscreen z-20 bg-violet-800/95 px-12 py-20 text-ctcolor medtab:max-w-[50rem] ${className}`}
    >
      <BackIcon onClick={() => setActive && setActive((s) => ({ ...s, isData: false }))} />
      <DataInfo />
    </div>
  );
};

export default DataPanel;
