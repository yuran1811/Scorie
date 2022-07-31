import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { BackIcon } from '@cpns/icons';
import { DataInfo } from './DataInfo';
import { FC } from 'react';

const DataPanel: FC<DivProps> = ({ className }) => {
  const { active, setActive } = usePanel();

  return (
    <div
      className={`${className || ''} ${
        active.isData ? 'translate-y-0' : 'translate-y-[200%]'
      } isAnimated fullscreen z-20 bg-ctcolor px-12 py-20 text-ctbg tablet:max-w-[50rem]`}
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
