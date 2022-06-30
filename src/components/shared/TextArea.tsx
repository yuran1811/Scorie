import { FC } from 'react';

export const TextArea: FC = () => {
	return (
		<textarea
			className='text-[3.5rem] text-white bg-ctbg max-w-[60rem] w-[90%] my-[0.5rem] px-[2rem] py-[1rem] outline-none border-[0.5rem] border-solid border-transparent rounded-[3.2rem] isAnimated focus:border-indigo-500'
			placeholder='Content'
		></textarea>
	);
};
