import { FC, HTMLProps } from 'react';

interface InputProps {
	formHandle?: any;
}

export const Input: FC<InputProps & HTMLProps<HTMLInputElement>> = ({ formHandle, ...otherProps }) => (
	<div className='flexcenter w-full'>
		<input
			{...otherProps}
			{...formHandle}
			className='text-[3.2rem] text-white bg-ctbg w-[100%] max-w-[30rem] my-[0.5rem] px-[1.8rem] py-[0.5rem] outline-none border-[0.5rem] border-solid border-transparent rounded-[2.8rem] isAnimated focus:border-indigo-500'
		/>
	</div>
);
