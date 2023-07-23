import { useAppStatus } from '@/contexts';
import { InlineLoading, ModalBox, ModalBoxHeader } from '@cpns/shared';
import { t } from 'i18next';
import { FC } from 'react';

interface AppStatusPopupProps {}

export const AppStatusPopup: FC<AppStatusPopupProps> = ({}) => {
  const { status, setStatus } = useAppStatus();

  if (!status.openModal) return <></>;

  return status.type === 'loading' ? (
    <InlineLoading />
  ) : status.type === 'error' ? (
    <ModalBox onClick={() => setStatus && setStatus((s) => ({ ...s, openModal: false }))}>
      <ModalBoxHeader onClick={() => setStatus && setStatus((s) => ({ ...s, openModal: false }))} />
      {status.Content || t('an error has occured')}
    </ModalBox>
  ) : (
    <></>
  );
};
