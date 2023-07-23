import { DivProps } from '@/shared';
import { NotificationIcon } from '@cpns/icons';
import { Overlay } from '@cpns/shared';
import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

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

      <div className="z-20 m-2 flex max-w-4xl flex-col gap-4 rounded-[2rem] bg-gray-900 p-6 text-gray-100">
        <h2 className="typo-semism flex items-center gap-4 font-semibold leading-tight tracking-wide">
          {titleIcon || <NotificationIcon active width="24" height="24" />}
          {title}
        </h2>

        <div className="typo-2sm w-full">{children}</div>

        <div className="typo-2sm mt-4 flex flex-col items-center gap-5 font-semibold ssmmb:flex-row ssmmb:justify-end">
          <div
            className="w-max cursor-pointer rounded-[2rem] border-4 border-transparent px-6 py-2 text-center transition-colors hover:border-violet-400"
            onClick={() => cancelHandle()}
          >
            {t('cancel')}
          </div>
          <div
            className="w-max cursor-pointer rounded-[2rem] border-4 border-transparent bg-violet-900 px-6 py-2 text-center text-violet-300 transition-colors hover:border-violet-400 hover:bg-violet-800"
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
