import { Tooltip } from '@cpns/shared';
import { FC } from 'react';
import { DivProps } from '@/shared';

const beforeStyle = `before:content-[""] before:absolute before:left-6 before:right-[unset] before:w-1/2 before:h-[0.8rem] before:rounded-[1rem] before:bg-current before:rotate-[-45deg] before:top-[1.7rem] before:left-[-1rem]`;
const afterStyle = `after:content-[""] after:absolute after:left-6 after:right-[unset] after:w-1/2 after:h-[0.8rem] after:rounded-[1rem] after:bg-current after:rotate-45 after:bottom-[1.7rem] after:left-[-1rem]`;
const hoverStyle = `cursor-pointer hover:translate-x-[-0.5rem] transition-all`;

export const BackIcon: FC<DivProps> = ({ className = '', onClick }) => (
  <Tooltip content="Back">
    <div
      className={`flexcenter relative mx-auto my-[0.6rem] h-[5.6rem] w-[5.6rem] !justify-start text-ctbg ${beforeStyle} ${afterStyle} ${hoverStyle} ${className}`}
      onClick={onClick}
    >
      <span className="h-[0.8rem] w-full rounded-[1rem] bg-current" />
    </div>
  </Tooltip>
);
