import { CloudCheckIcon, MessageIcon, NotificationIcon } from 'components/icons';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { getNotification } from 'utils';

interface ToolsContainerProps {
	showMore: boolean;
	setOpened: Dispatch<SetStateAction<boolean>>;
}

export const ToolsContainer: FC<ToolsContainerProps> = ({ showMore, setOpened }) => {
	const [notificationActive, setNotificationActive] = useState(false);

	const notificationHandle = useCallback(() => {
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
			setOpened(true);
		}
	}, []);

	return (
		<div
			className={`${
				showMore ? 'flex' : 'hidden'
			} flex-col items-center justify-start absolute right-[1rem] top-[9rem] bg-ctbg rounded-[1.5rem] border-indigo-200 border-l-[0.5rem] border-b-[0.5rem]`}
		>
			<NotificationIcon
				className='cursor-pointer my-4 mx-6'
				active={notificationActive}
				width='40'
				height='40'
				onClick={notificationHandle}
			/>
			<CloudCheckIcon className='cursor-pointer my-4 mx-6' width='40' height='40' />
			<MessageIcon className='cursor-pointer my-4 mx-6' width='40' height='40' />
		</div>
	);
};
