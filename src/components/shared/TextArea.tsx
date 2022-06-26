import { FC } from 'react';

export const TextArea: FC = () => {
	return (
		<textarea
			className='text-[3.5rem] text-white bg-ctbg max-w-[60rem] w-[90%] min-w-[25rem] my-[0.5rem] px-[2rem] py-[1rem] outline-none border-[0.5rem] border-solid border-transparent rounded-[3.2rem] transition-all duration-300 ease-in-out focus:border-indigo-500'
			placeholder='Content'
		></textarea>
	);
};
