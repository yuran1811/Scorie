import { DivProps } from '@/shared';
import { sharingHandle } from '@/utils';
import { Button, Overlay } from '@cpns/shared';
import { FC } from 'react';
import { createPortal } from 'react-dom';

export const QRCode: FC<DivProps> = ({ onClick }) =>
  createPortal(
    <div className="fullscreen flexcentercol scrollY">
      <Overlay zIdx="z-[-1]" onClick={onClick} />

      <div className="absolute h-[30rem] w-[38rem]" />
      <img className="h-[32rem] w-[32rem] object-contain" src={'/QRCode.PNG'} alt="qrcode" />
      <Button
        className="z-[1] mt-8 border-gray-900 bg-violet-400 text-gray-900 hover:border-violet-400 hover:bg-gray-900 hover:text-violet-400"
        content="Share"
        onClick={() => sharingHandle()}
      />
    </div>,
    document.querySelector('#over-tippy-container') as HTMLElement
  );
