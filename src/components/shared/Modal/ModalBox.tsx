import { DivProps } from '@/shared';
import { FullscreenOverlay } from '@cpns/shared';
import { FC } from 'react';

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
}) => (
  <FullscreenOverlay overlayInteractive onClick={onClick}>
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
  </FullscreenOverlay>
);
