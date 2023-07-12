import { DivProps } from '@/shared';
import { Dispatch, FC, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';

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
      className={`isAnimated flexcenter absolute bottom-0 left-0 right-0 origin-top flex-wrap border-t border-ctcolor bg-ctbg p-2 text-ctcolor ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <div className="typo mb-4 p-4 text-center font-bold">{t(content || 'default confirm')}</div>
        <div className="flexcenter mx-auto max-w-[32rem] flex-wrap">
          <Button
            content="Cancel"
            onClick={() => {
              setConfirm(false);
            }}
          />
          <Button
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
