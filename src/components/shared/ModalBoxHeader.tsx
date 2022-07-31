import { DivProps } from '@/shared';
import { CloseIcon } from '@cpns/icons';
import { FC } from 'react';

export const ModalBoxHeader: FC<DivProps> = ({ className, onClick, children }) => (
  <div
    className={`${
      className || ''
    } sticky top-0 left-0 right-0 z-10 flex items-center justify-between bg-indigo-300 p-8`}
  >
    <div className="flexcenter flex-wrap pr-[5.5rem]">
      {children || <div className="h-[5rem] w-[5rem]"></div>}
    </div>

    <CloseIcon
      className="absolute right-3 top-1/2 mx-4 -translate-y-1/2 cursor-pointer tablet:right-6"
      width="50"
      height="50"
      onClick={onClick}
    />
  </div>
);
