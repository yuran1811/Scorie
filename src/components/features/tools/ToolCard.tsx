import { YinYangIcon } from '@cpns/icons';
import { FC } from 'react';

interface ToolCardProps {
  data: { id: number; name: string };
}

export const ToolCard: FC<ToolCardProps> = ({ data: { id, name } }) => {
  return (
    <div className="tablet:max-w-[30rem] w-full h-[30rem] p-4 rounded-[1.5rem] font-bold text-center text-white bg-black">
      <div className="p-6 mb-8">{name}</div>
      <div className="flexcenter">
        <YinYangIcon className="animate-spin" width="120" height="120" />
      </div>
    </div>
  );
};
