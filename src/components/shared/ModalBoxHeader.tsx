import { DivProps } from '@/shared';
import { CloseIcon } from '@cpns/icons';
import { FC } from 'react';

export const ModalBoxHeader: FC<DivProps> = ({ className = '', onClick, children }) => (
  <div
    className={`sticky left-0 right-0 top-0 z-10 flex items-center justify-between bg-indigo-500/50 p-8 backdrop-blur-lg ${className}`}
  >
    <div className="flexcenter flex-wrap pr-[5.5rem]">{children || <div className="h-[5rem] w-[5rem]"></div>}</div>

    <CloseIcon
      className="medtab:right-6 absolute right-3 top-1/2 mx-4 -translate-y-1/2 cursor-pointer"
      width="50"
      height="50"
      onClick={onClick}
    />
  </div>
);
