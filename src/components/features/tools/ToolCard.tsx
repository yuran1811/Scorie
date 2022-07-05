import { YinYangIcon } from 'components/icons';
import { FC } from 'react';

interface ToolCardProps {
	data: { id: number; name: string };
}

export const ToolCard: FC<ToolCardProps> = ({ data: { id, name } }) => {
	return (
		<div className='tablet:max-w-[30rem] w-full h-[30rem] p-4 rounded-[1.5rem] font-bold text-center text-black bg-white'>
			<div className='p-6 mb-8'>{name}</div>
			<div className='flexcenter'>
				<YinYangIcon width='90' height='90' />
			</div>
		</div>
	);
};
