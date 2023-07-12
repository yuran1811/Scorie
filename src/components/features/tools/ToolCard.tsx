import { YinYangIcon } from '@cpns/icons';
import { FC } from 'react';

interface ToolCardProps {
  data: { id: number; name: string };
}

export const ToolCard: FC<ToolCardProps> = ({ data: { id, name } }) => {
  return (
    <div className="h-[30rem] w-full rounded-[1.5rem] bg-black p-4 text-center font-bold text-white medtab:max-w-[30rem]">
      <div className="flexcenter mb-8 gap-4 p-6">
        <div className="typo-sm line-clamp-1 w-full">{name}</div>
        {/* <YinYangIcon className="animate-spin" width="25" height="25" /> */}
      </div>
      <div className="flexcentercol">
        <div className="morphShape !h-64 !w-64" />
      </div>
    </div>
  );
};
