import { BackIcon } from 'components/icons';
import { ErrorText } from 'components/interfaces';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

interface ErrorContentProps {
	errorBoundaries?: boolean;
}

export const ErrorContent: FC<ErrorContentProps> = ({ errorBoundaries = false }) => {
	const navigate = useNavigate();

	return (
		<div className='p-[5rem]'>
			<ErrorText className='text-[7rem] tablet:text-[15rem] mobile:line-clamp-1'>Oops!</ErrorText>
			<ErrorText className='text-[4rem] tablet:text-[5rem] line-clamp-3'>Something went wrong!</ErrorText>

			<BackIcon
				className='!text-indigo-300'
				onClick={() => {
					if (errorBoundaries) {
						navigate('/');
						window.location.reload();
					} else navigate(-1);
				}}
			/>
		</div>
	);
};
