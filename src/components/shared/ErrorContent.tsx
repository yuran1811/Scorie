import { ctUnderline } from 'utils';
import { HOST_URL } from '../../constants';
import { BackIcon } from 'components/icons';
import { ErrorText } from 'components/interfaces';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const ErrorContent: FC = () => (
	<div className='p-[5rem]'>
		<ErrorText extraStyle='text-[15rem]'>404</ErrorText>
		<ErrorText extraStyle='text-[5rem]'>Page not found</ErrorText>
		<ErrorText extraStyle='text-[3rem] mt-8'>
			<Link to={`${HOST_URL}/`} className={`relative ${ctUnderline}`}>
				Home
			</Link>
			<BackIcon />
		</ErrorText>
	</div>
);
