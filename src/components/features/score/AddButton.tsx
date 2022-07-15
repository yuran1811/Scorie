import { PlusIcon } from 'components/icons';
import { DivProps } from 'shared';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'components/shared';

export const AddButton: FC<DivProps> = ({ onClick }) => (
	<motion.div
		drag
		dragConstraints={{ top: 0, left: 0, right: 50, bottom: 70 }}
		dragElastic={1}
		className='opacity-30 mobile:opacity-100 z-[10] active:opacity-100 hover:opacity-100 cursor-pointer flexcenter fixed desktop:right-[10rem] right-[5rem] desktop:bottom-[7rem] tablet:bottom-[10rem] bottom-[7rem] w-[7rem] h-[7rem] rounded-[50%] border-[0.5rem] border-indigo-200 bg-ctbg'
		onClick={onClick}
	>
		<Tooltip
			content='Add new score'
			options={{
				delay: 400,
			}}
		>
			<PlusIcon
				className='z-[1] relative top-[-1.5rem] right-[-0.8rem] text-white cursor-pointer'
				width='55'
				height='55'
			/>
		</Tooltip>
	</motion.div>
);
