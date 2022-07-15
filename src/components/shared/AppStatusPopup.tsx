import { useAppStatus } from 'contexts';
import { ThreeDotsFade } from 'components/icons';
import { ModalBoxHeader } from './ModalBoxHeader';
import { ModalBox } from './ModalBox';
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
