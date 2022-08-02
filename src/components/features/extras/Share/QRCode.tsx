import { sharingHandle } from '@/utils';
import { Button, Overlay } from '@cpns/shared';
import { DivProps } from '@shared/types';
import { FC } from 'react';
import { createPortal } from 'react-dom';

export const QRCode: FC<DivProps> = ({ onClick }) =>
  createPortal(
    <div className="fullscreen flexcentercol scrollY">
      <Overlay zIdx="z-[-1]" onClick={onClick} />

      <img
        className="h-[32rem] w-[32rem] scale-75 smallmb:scale-100"
        src="./QRCode.PNG"
        alt="qrcode"
      />
      <Button
        className="mt-8 border-gray-900 bg-violet-400 !text-[3rem] text-gray-900 hover:border-violet-400 hover:bg-gray-900 hover:text-violet-400"
        content="Share"
        onClick={() => sharingHandle()}
      />
    </div>,
    document.querySelector('#over-tippy-container') as HTMLElement
  );
