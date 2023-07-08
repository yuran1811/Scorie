import { DivProps } from '@/shared';
import { Button } from './Button';
import { Dispatch, FC, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

interface ConfirmBoxProps {
  content?: string;
  actionWhenConfirm: () => Promise<any>;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}

export const ConfirmBox: FC<ConfirmBoxProps & DivProps> = ({
  className = '',
  content,
  setConfirm,
  actionWhenConfirm,
  ...otherProps
}) => {
  const { t } = useTranslation();

  return createPortal(
    <div
      {...otherProps}
      className={`isAnimated flexcenter absolute bottom-0 left-0 right-0 origin-top flex-wrap bg-ctcolor/50 p-2 backdrop-blur-lg ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <div className="medtab:text-[3.5rem] mb-4 p-4 text-center text-[3rem] font-bold text-ctbg">
          {t(content || 'default confirm')}
        </div>
        <div className="flexcenter flex-wrap">
          <Button
            className="!text-[3rem]"
            content="Cancel"
            onClick={() => {
              setConfirm(false);
            }}
          />
          <Button
            className="!text-[3rem]"
            content="Confirm"
            onClick={() => {
              actionWhenConfirm().finally(() => {
                setConfirm(false);
              });
            }}
          />
        </div>
      </div>
    </div>,
    document.getElementById('confirm-container') as HTMLElement
  );
};
