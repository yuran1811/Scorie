import { Avatar, ModalBox, ModalBoxHeader } from 'components/shared';
import { ToolsContainer } from './ToolsContainer';
import { FC, useState } from 'react';
import Tippy from '@tippyjs/react';

export const ExtraTools: FC = () => {
	const [showMore, setShowMore] = useState(false);
	const [isOpened, setOpened] = useState(false);

	return (
		<>
			<div>
				<Tippy
					interactive
					visible={showMore}
					placement='bottom-end'
					onClickOutside={() => setShowMore(false)}
					render={(attrs) => <ToolsContainer {...attrs} showMore={showMore} setOpened={setOpened} />}
				>
					<div className='flex items-center justify-end w-[9.5rem] h-[5.5rem]'>
						<Avatar
							className='cursor-pointer absolute right-0 mx-8'
							imgUrl=''
							radius='5.5rem'
							onClick={() => setShowMore((a) => !a)}
						/>
					</div>
				</Tippy>
			</div>

			{isOpened && (
				<ModalBox onClick={() => setOpened(false)}>
					<ModalBoxHeader onClick={() => setOpened(false)} />

					<div className='flexcentercol px-6 pb-7'>
						<div className='w-[80%] text-[3rem] text-indigo-900 text-center mobile:px-8 pb-8'>
							Please enable notification on this site to use notification feature
						</div>
					</div>
				</ModalBox>
			)}
		</>
	);
};
