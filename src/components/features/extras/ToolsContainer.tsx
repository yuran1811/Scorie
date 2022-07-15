import { getNotification } from 'utils';
import { useAppStatus } from 'contexts';
import { Tooltip } from 'components/shared';
import { CloudCheckIcon, NotificationIcon } from 'components/icons';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastDefaultConfig } from 'shared';

interface ToolsContainerProps {
	showMore: boolean;
}

export const ToolsContainer: FC<ToolsContainerProps> = ({ showMore, ...otherPropss }) => {
	const { setStatus } = useAppStatus();

	const [notificationActive, setNotificationActive] = useState(false);

	const notificationHandle = () => {
		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
			return;
		}

		const { permission } = Notification;

		if (permission === 'granted') {
			setNotificationActive(true);
			getNotification('Allowed Scorie to send notification !', { body: 'Created by Scorie' });
		}

		if (permission === 'denied') {
			setNotificationActive(false);

			toast.error('Please enable notification on this site to use notification feature !', {
				...ToastDefaultConfig,
				toastId: 'unenable-noti',
				autoClose: 5000,
				position: 'top-center',
			});
			// setStatus &&
			// 	setStatus((s) => ({
			// 		...s,
			// 		type: 'error',
			// 		openModal: true,
			// 		Content: (
			// 			<div className='flexcentercol px-6 pb-7'>
			// 				<div className='w-[80%] text-[3rem] text-indigo-900 text-center mobile:px-8 pb-8'>
			// 					Please enable notification on this site to use notification feature
			// 				</div>
			// 			</div>
			// 		),
			// 	}));
		}
	};

	return (
		<div
			{...otherPropss}
			className={`${
				showMore ? 'flex' : 'hidden'
			} flex-col items-center justify-start absolute right-[1rem] top-[9rem] bg-ctbg rounded-[1.5rem] border-indigo-200 border-l-[0.5rem] border-b-[0.5rem]`}
		>
			<Tooltip content='Turn on/off notification'>
				<NotificationIcon
					className='cursor-pointer my-4 mx-6'
					active={notificationActive}
					width='40'
					height='40'
					onClick={notificationHandle}
				/>
			</Tooltip>

			<Tooltip content='Sync status'>
				<CloudCheckIcon className='cursor-pointer my-4 mx-6' width='40' height='40' />
			</Tooltip>
		</div>
	);
};
