import { FC } from 'react';

interface ChartCardProps {
	data: {
		id: number;
		name: string;
	};
}

export const ChartCard: FC<ChartCardProps> = ({ data: { id, name } }) => {
	return <div className='tablet:max-w-[30rem] w-full h-[30rem] p-4 rounded-[1.5rem] font-bold text-center text-red-900 bg-red-300'>Chart Card</div>;
};
