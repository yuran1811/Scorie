import { classnames, zIdxOrder } from '@/utils';
import { Overlay } from '@cpns/shared';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export interface FullscreenOverlayProps extends PropsWithChildren {
  portalSelector?: string;
  containerClass?: string;
  zIdx?: keyof typeof zIdxOrder;
  overlayInteractive?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const FullscreenOverlay: FC<FullscreenOverlayProps> = ({
  portalSelector,
  containerClass,
  zIdx = 'behind',
  overlayInteractive,
  onClick,
  children,
}) =>
  createPortal(
    <div className={classnames('fullscreen flexcentercol z-20', containerClass)}>
      {overlayInteractive ? <Overlay zIdx={zIdx} onClick={onClick} /> : <Overlay />}
      {children}
    </div>,
    document.querySelector(portalSelector || '#modal-container') as HTMLElement,
  );
