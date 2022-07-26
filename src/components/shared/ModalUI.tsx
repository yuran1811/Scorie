import { NotificationIcon } from '@cpns/icons';
import { DivProps } from '@shared/types';
import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Overlay } from './Overlay';

interface ModalUIProps {
  title: string;
  titleIcon?: any;
  cancelHandle: CallableFunction;
}

export const ModalUI: FC<ModalUIProps & DivProps> = ({
  children,
  title,
  titleIcon,
  onClick,
  cancelHandle,
}) => {
  const { t } = useTranslation();

  return createPortal(
    <div className="flexcenter fullscreen z-[11]" onClick={() => cancelHandle()}>
      <Overlay />

      <div className="z-20 flex max-w-4xl flex-col gap-4 rounded-[2rem] bg-gray-900 p-8 text-gray-100">
        <h2 className="flex items-center gap-4 text-[3rem] font-semibold leading-tight tracking-wide">
          {titleIcon || <NotificationIcon active width="30" height="30" />}
          {title}
        </h2>

        {children}

        <div className="mt-8 flex flex-col justify-end gap-5 sm:flex-row text-[2.5rem]">
          <div
            className="cursor-pointer rounded-[2rem] border-2 border-transparent px-8 py-4 transition-colors hover:border-violet-400"
            onClick={() => cancelHandle()}
          >
            {t('cancel')}
          </div>
          <div
            className="cursor-pointer rounded-[2rem] bg-violet-400 px-8 py-5 font-semibold text-gray-900 transition-colors
            hover:bg-violet-800 hover:text-violet-300"
            onClick={onClick}
          >
            {t('confirm')}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('#modal-container') as HTMLElement
  );
};
