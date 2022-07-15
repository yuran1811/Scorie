import { ToolsContainer } from './ToolsContainer';
import { Avatar } from 'components/shared';
import { FC, useState } from 'react';
import Tippy from '@tippyjs/react';

export const ExtraTools: FC = () => {
	const [showMore, setShowMore] = useState(false);

	return (
		<div className='custom-tippy'>
			<Tippy
				interactive
				visible={showMore}
				placement='bottom-end'
				onClickOutside={() => setShowMore(false)}
				render={(attrs) => <ToolsContainer {...attrs} showMore={showMore} />}
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
	);
};
