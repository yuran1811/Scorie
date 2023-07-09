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

export const ModalUI: FC<ModalUIProps & DivProps> = ({ children, title, titleIcon, onClick, cancelHandle }) => {
  const { t } = useTranslation();

  return createPortal(
    <div className="flexcenter fullscreen z-[11]" onClick={() => cancelHandle()}>
      <Overlay />

      <div className="z-20 flex max-w-4xl flex-col gap-4 rounded-[2rem] bg-gray-900/70 p-8 text-gray-100">
        <h2 className="typo flex items-center gap-4 font-semibold leading-tight tracking-wide">
          {titleIcon || <NotificationIcon active width="30" height="30" />}
          {title}
        </h2>

        {children}

        <div className="typo-sm mt-8 flex flex-col justify-end gap-5 medtab:flex-row">
          <div
            className="cursor-pointer rounded-[2rem] border-4 border-transparent px-6 py-2 transition-colors hover:border-violet-400"
            onClick={() => cancelHandle()}
          >
            {t('cancel')}
          </div>
          <div
            className="cursor-pointer rounded-[2rem] border-4 border-transparent bg-violet-700/40 px-6 py-2 font-semibold text-violet-300 transition-colors hover:border-violet-400 hover:bg-violet-800/50"
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
