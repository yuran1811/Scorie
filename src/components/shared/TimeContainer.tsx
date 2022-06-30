import { Timestamp } from 'firebase/firestore';
import { FC, HTMLProps } from 'react';
import { formatDate } from 'utils';

interface TimeContainerProps {
	obj: {
		createdAt: Timestamp | undefined | null;
		updatedAt: Timestamp | undefined | null;
	};
}

export const TimeContainer: FC<TimeContainerProps & HTMLProps<HTMLDivElement>> = ({ obj, className }) => (
	<div className={`${className || ''} flexcentercol text-[3rem] text-ctbg px-5`}>
		{obj?.createdAt && <div className=''>Create: {formatDate(obj.createdAt.seconds * 1000)}</div>}
		{obj?.updatedAt && <div className=''>Last update: {formatDate(obj.updatedAt.seconds * 1000)}</div>}
	</div>
);
