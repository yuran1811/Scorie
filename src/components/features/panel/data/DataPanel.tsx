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
      } z-20 isAnimated fullscreen px-12 py-20 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
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
