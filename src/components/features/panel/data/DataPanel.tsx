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
      } isAnimated fullscreen medtab:max-w-[50rem] z-20 bg-ctcolor px-12 py-20 text-ctbg ${className}`}
    >
      <BackIcon
        onClick={() =>
          setActive &&
          setActive((s) => ({
            ...s,
            isData: false,
          }))
        }
      />

      <DataInfo />
    </div>
  );
};

export default DataPanel;
