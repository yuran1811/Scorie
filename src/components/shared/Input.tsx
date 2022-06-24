import { FC, HTMLProps } from 'react';

interface InputProps {
	formHandle?: any;
}

export const Input: FC<InputProps & HTMLProps<HTMLInputElement>> = ({ formHandle, ...otherProps }) => (
	<div className='flexcenter w-full'>
		<input
			{...otherProps}
			{...formHandle}
			className='text-[3.5rem] text-white bg-ctbg w-[60%] max-w-[60rem] min-w-[22rem] my-[0.5rem] px-[2rem] py-[1rem] outline-none border-[0.5rem] border-solid border-transparent rounded-[3.2rem] transition-all duration-300 ease-in-out focus:border-indigo-500'
		/>
	</div>
);
