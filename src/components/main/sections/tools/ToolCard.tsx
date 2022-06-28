import { FC } from 'react';

interface ToolCardProps {
	data: { id: number; name: string };
}

export const ToolCard: FC<ToolCardProps> = ({ data: { id, name } }) => {
	return (
		<div className='tablet:max-w-[30rem] w-full  h-[10rem] p-4 rounded-[1.5rem] font-bold text-center text-black bg-white'>
			Tool Card
		</div>
	);
};
