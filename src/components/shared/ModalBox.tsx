import { DivProps } from '@/shared';
import { Overlay } from '@cpns/shared';
import { FC } from 'react';

export const ModalBox: FC<DivProps> = ({ className = '', onClick, children }) => (
  <div className="flexcenter fullscreen z-[100]">
    <Overlay zIdx="z-[1]" onClick={onClick} />

    <div className="z-[2] max-w-[90%] text-[5rem] text-white medtab:max-w-[80%]">
      <div
        className={`scrollY max-h-[calc(100vh-5rem)] rounded-[3rem] bg-indigo-800/40 text-center font-bold text-rose-600/60 backdrop-blur-lg medtab:max-h-[calc(100vh-15rem)] ${className}`}
      >
        {children}
      </div>
    </div>
  </div>
);
