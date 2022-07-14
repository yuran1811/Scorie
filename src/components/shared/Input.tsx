import { FC } from 'react';
import { InputProps } from 'shared';

interface CustomInputProps {
	formHandle?: any;
	hasWrapper?: boolean;
}

export const Input: FC<CustomInputProps & InputProps> = ({ hasWrapper, formHandle, className, ...otherProps }) => (
	<>
		{!!hasWrapper ? (
			<div className='flexcenter w-full'>
				<input
					{...otherProps}
					{...formHandle}
					className={`${
						className || ''
					} text-[3.2rem] text-white bg-ctbg w-full max-w-[32rem] my-[0.5rem] px-[1.8rem] py-[0.5rem] outline-none border-[0.5rem] border-solid border-transparent rounded-[2.4rem] isAnimated focus:border-current`}
				/>
			</div>
		) : (
			<input
				{...otherProps}
				{...formHandle}
				className={`${
					className || ''
				} text-[3.2rem] text-white bg-ctbg w-full max-w-[32rem] my-[0.5rem] px-[1.8rem] py-[0.5rem] outline-none border-[0.5rem] border-solid border-transparent rounded-[2.4rem] isAnimated focus:border-current`}
			/>
		)}
	</>
);
