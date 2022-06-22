import { ErrorText } from 'components/interfaces';
import { FC } from 'react';

export const ErrorContent: FC = () => (
	<div className='p-[5rem]'>
		<ErrorText extraStyle='text-[15rem]'>404</ErrorText>
		<ErrorText extraStyle='text-[5rem]'>Page not found</ErrorText>
	</div>
);
