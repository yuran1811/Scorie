import { ProgressIcon } from 'components/icons';
import { usePanel } from 'contexts';
import { DivProps } from 'shared';
import { FC } from 'react';

const DataBar: FC<DivProps> = (props) => {
	const { active, setActive } = usePanel();

	return (
		<div
			{...props}
			onClick={() =>
				setActive &&
				setActive((s) => ({
					...s,
					isData: !active.isData,
				}))
			}
		>
			<ProgressIcon className='text-ctbg cursor-pointer' width='40' height='40' />
			<div className='font-bold ml-6 line-clamp-1'>Data</div>
		</div>
	);
};

export default DataBar;
