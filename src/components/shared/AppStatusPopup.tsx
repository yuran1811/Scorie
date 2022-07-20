import { useAppStatus } from '@/contexts';
import { ThreeDotsFade } from '@cpns/icons';
import { ModalBox, ModalBoxHeader } from '@cpns/shared';
import { FC } from 'react';

interface AppStatusPopupProps {}

export const AppStatusPopup: FC<AppStatusPopupProps> = ({}) => {
  const { status, setStatus } = useAppStatus();

  if (!status.openModal) return <></>;

  return status.type === 'loading' ? (
    <div>
      <ThreeDotsFade />
    </div>
  ) : status.type === 'error' ? (
    <ModalBox onClick={() => setStatus && setStatus((s) => ({ ...s, openModal: false }))}>
      <ModalBoxHeader onClick={() => setStatus && setStatus((s) => ({ ...s, openModal: false }))} />
      {status.Content || 'An error has occured'}
    </ModalBox>
  ) : (
    <></>
  );
};
