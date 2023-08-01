import { DivProps } from '@/shared';
import { sharingHandle } from '@/utils';
import { FullscreenOverlay } from '@cpns/shared';
import { FC } from 'react';

export const QRCode: FC<DivProps> = ({ onClick }) => (
  <FullscreenOverlay portalSelector="#over-tippy-container" containerClass="scrollY" overlayInteractive onClick={onClick}>
    <div className="typo-2sm relative">
      <img
        className="sticky left-0 right-0 top-0 aspect-square w-[36rem] cursor-pointer rounded-[3.2rem] object-contain"
        src={'/QRCode.PNG'}
        alt="qrcode"
        onClick={() => sharingHandle()}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] animate-pulse cursor-pointer text-center font-semibold"
        onClick={() => sharingHandle()}
      >
        Click to share
      </div>
    </div>
  </FullscreenOverlay>
);
