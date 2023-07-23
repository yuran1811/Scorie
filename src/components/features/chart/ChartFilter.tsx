import { classnames } from '@/utils';
import { Button } from '@cpns/shared';
import { FC } from 'react';

interface ChartFilterProps {
  active: boolean;
  content: string;
  onClick: any;
}

export const ChartFilter: FC<ChartFilterProps> = ({ active, content, onClick }) => {
  return (
    <div className="flexcentercol relative">
      <Button className="!font-bold" onClick={onClick} content={content} />
      <div
        className={classnames(
          'isAnimated absolute bottom-1 left-1/2 z-[1] h-[2rem] w-[2rem] -translate-x-1/2 scale-0 rounded-full border-4 border-violet-900 bg-green-400',
          active ? '!scale-100' : ''
        )}
      />
    </div>
  );
};
