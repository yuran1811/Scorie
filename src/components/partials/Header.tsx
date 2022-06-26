import { MenuIcon, MessageIcon, NotificationIcon } from 'components/icons';
import { Panel } from 'components/panel';
import { Avatar, ModalBox, ModalBoxHeader } from 'components/shared';
import { MenuProvider } from 'contexts';
import { FC, useCallback, useState } from 'react';

export const Header: FC = () => {
	const [notificationActive, setNotificationActive] = useState(false);
	const [isOpened, setOpened] = useState(false);
	const [showMore, setShowMore] = useState(false);

	const getNotification = useCallback(({ title, options }) => new Notification(title, options), []);

	const notificationHandle = useCallback(() => {
		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
			return;
		}

		const { permission } = Notification;

		if (permission === 'granted') {
			setNotificationActive(true);
			getNotification({
				title: 'Allowed Scorie to send notification !',
				option: { body: 'Created by Scorie' },
			});
		}

		if (permission === 'denied') {
			setNotificationActive(false);
			setOpened(true);
			// alert('Please enable notification on this site to use');
		}
	}, []);

	return (
		<header className='z-20 flexcenter !justify-between sticky top-0 w-full h-[8rem] bg-ctbg'>
			<MenuProvider>
				<MenuIcon className='mx-10 z-20' />
				<Panel className='z-[19]' />
			</MenuProvider>

			<div className='font-bold text-[4.6rem] text-center'>Scorie</div>

			<div className='flex items-center justify-end w-[5.5rem] h-[5.5rem]'>
				<Avatar
					className='cursor-pointer absolute right-0 mx-8'
					imgUrl=''
					radius='5.5rem'
					onClick={() => setShowMore((a) => !a)}
				/>
				<div
					className={`${
						showMore ? 'flex' : 'hidden'
					} tablet:flex tablet:flex-row flex-col items-center tablet:justify-end justify-start absolute tablet:right-[8rem] right-[1rem] tablet:top-[1rem] top-[9rem] bg-ctbg rounded-[1.5rem] border-indigo-200 border-l-[0.5rem] border-b-[0.5rem]`}
				>
					<MessageIcon className='cursor-pointer my-4 mx-6' width='40' height='40' />
					<NotificationIcon
						className='cursor-pointer my-4 mx-6'
						active={notificationActive}
						width='40'
						height='40'
						onClick={notificationHandle}
					/>
				</div>
			</div>

			{isOpened && (
				<ModalBox onClick={() => setOpened(false)}>
					<ModalBoxHeader onClick={() => setOpened(false)} />

					<div className='flexcentercol px-6 pb-7'>
						<div className='w-[80%] text-[3rem] text-indigo-900 text-center px-8 pb-8'>
							Please enable notification on this site to use
						</div>
					</div>
				</ModalBox>
			)}
		</header>
	);
};
