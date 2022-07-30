import { sharingHandle } from '@/utils';
import { Button, Overlay } from '@cpns/shared';
import { DivProps } from '@shared/types';
import { FC } from 'react';

export const QRCode: FC<DivProps> = ({ onClick }) => (
  <div className="fullscreen flexcenter scrollY z-20">
    <Overlay zIdx="z-[-1]" onClick={onClick} />

    <div className="flexcentercol">
      <img className="h-[32rem] w-[32rem]" src="/QRCode.png" alt="qrcode" />
      <Button
        className="mt-8 border-gray-900 bg-violet-400 !text-[3rem] text-gray-900 hover:border-violet-400 hover:bg-gray-900 hover:text-violet-400"
        content="Share"
        onClick={() => sharingHandle()}
      />
    </div>
  </div>
);
