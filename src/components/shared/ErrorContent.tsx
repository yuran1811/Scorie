import { ErrorText } from 'components/interfaces';
import { FC } from 'react';

export const ErrorContent: FC = () => (
	<div className='p-[5rem]'>
		<ErrorText extraStyle='text-[15rem]'>Oops!</ErrorText>
		<ErrorText extraStyle='text-[5rem]'>Something went wrong!</ErrorText>
	</div>
);
