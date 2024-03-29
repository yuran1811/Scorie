import { DivProps } from '@/shared';
import { CloseIcon } from '@cpns/icons';
import { FC } from 'react';

export const ModalBoxHeader: FC<DivProps> = ({ className = '', onClick, children }) => (
  <div className={`sticky left-0 right-0 top-0 z-10 flex items-center justify-between bg-inherit px-8 py-6 ${className}`}>
    <div className="flexcenter flex-wrap pr-[5.5rem]">{children || <div className="h-[5rem] w-[5rem]" />}</div>
    <CloseIcon
      className="absolute right-3 top-1/2 mx-4 aspect-square w-12 -translate-y-1/2 cursor-pointer medtab:right-6"
      onClick={onClick}
    />
  </div>
);
