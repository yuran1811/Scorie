import { InputProps } from 'shared';
import { FC, RefObject, useState } from 'react';

interface SearchBarProps {
	inputRef: RefObject<HTMLInputElement>;
}

export const SearchBar: FC<SearchBarProps & InputProps> = ({ inputRef, onChange }) => {
	const [isActive, setActive] = useState(false);

	return (
		<div className='flexcenter relative w-[80%] h-[6rem]'>
			<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
				<input
					ref={inputRef}
					className={`outline-none border-[0.4rem] border-solid border-white text-[3rem]
					${
						isActive
							? 'w-[28rem] tablet:w-[36rem] h-[6rem] rounded-none py-[0.8rem] pl-[2rem] pr-[5.5rem]'
							: 'w-[5rem] h-[5rem] rounded-[5rem]'
					}`}
					style={{
						background: 'none',
						transition:
							'width 0.4s 0.1s ease-in-out, border-radius 0.4s 0.2s ease-in-out, padding 0.2s 0.4s',
					}}
					type='text'
					onChange={onChange}
					onClick={(e) => e.stopPropagation()}
				/>
				<button
					className={`isAnimated bg-none cursor-pointer absolute w-[5rem] h-[5rem] top-0 bottom-0 right-0 border-none before:content-[""] before:w-[0.4rem] before:h-[2.5rem] before:bg-white before:absolute before:bottom-[-1.6rem] before:right-[-0.6rem] before:rotate-[-45deg] before:isAnimated after:isAnimated ${
						isActive &&
						`!w-[6rem] !h-[6rem] before:content-[""] before:w-[0.4rem] before:h-[3.4rem] before:bg-white before:absolute before:bottom-[1.2rem] before:right-[2.8rem] after:content-[""] after:w-[0.4rem] after:h-[3.4rem] after:bg-white after:absolute after:bottom-[1.2rem] after:right-[2.8rem] after:rotate-45`
					}`}
					style={{ background: 'none' }}
					onClick={() => {
						if (isActive && inputRef !== null && inputRef?.current) inputRef.current.value = '';
						setActive((s) => !s);
					}}
				/>
			</div>
		</div>
	);
};
