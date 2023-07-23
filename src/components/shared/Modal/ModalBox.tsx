import { DivProps } from '@/shared';
import { Overlay } from '@cpns/shared';
import { FC } from 'react';
import { createPortal } from 'react-dom';

interface ModalBoxProps {
  disableContainerClass?: boolean;
  disableTypo?: boolean;
}

export const ModalBox: FC<DivProps & ModalBoxProps> = ({
  disableContainerClass = false,
  disableTypo = false,
  className = '',
  onClick,
  children,
}) =>
  createPortal(
    <div className={'flexcenter fullscreen z-[100]'}>
      <Overlay zIdx="z-[1]" onClick={onClick} />

      <div className="typo-2xl z-[2] max-w-[90%] medtab:max-w-[80%]">
        <div
          className={
            disableContainerClass
              ? className
              : `scrollY max-h-[calc(100vh-5rem)] rounded-[2.4rem] border-l-4 border-t-4 border-violet-400/70 bg-gray-900 text-center font-bold text-ctcolor medtab:max-h-[calc(100vh-15rem)] ${className}`
          }
        >
          {children}
        </div>
      </div>
    </div>,
    document.querySelector('#modal-container') as HTMLElement
  );
