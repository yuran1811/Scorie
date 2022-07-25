import { DivProps } from '@/shared';
import { CloseIcon } from '@cpns/icons';
import { FC } from 'react';

export const ModalBoxHeader: FC<DivProps> = ({ className, onClick, children }) => (
  <div
    className={`${
      className || ''
    } z-10 sticky top-0 left-0 right-0 flex items-center justify-between p-8 bg-indigo-300`}
  >
    <div className="flexcenter flex-wrap pr-[5.5rem]">
      {children || <div className="w-[5rem] h-[5rem]"></div>}
    </div>

    <CloseIcon
      className="cursor-pointer absolute right-3 tablet:right-6 top-1/2 -translate-y-1/2 mx-4"
      width="50"
      height="50"
      onClick={onClick}
    />
  </div>
);
