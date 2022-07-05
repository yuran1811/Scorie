import { BackIcon } from 'components/icons';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

export const LogInRequired: FC = () => {
	const navigate = useNavigate();

	return (
		<div className='flexcentercol relative w-full h-[30rem] text-[4rem] mobile:text-[5rem] text-white'>
			<div className='font-semibold text-center p-6'>Please log in to use this feature</div>
			<BackIcon className='!text-white' onClick={() => navigate(-1)} />
		</div>
	);
};
