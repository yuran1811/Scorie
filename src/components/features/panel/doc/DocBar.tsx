import { BookIcon } from 'components/icons';
import { usePanel } from 'contexts';
import { DivProps } from 'shared';
import { FC } from 'react';

const DocBar: FC<DivProps> = (props) => {
	const { active, setActive } = usePanel();

	return (
		<div
			{...props}
			onClick={() =>
				setActive &&
				setActive((s) => ({
					...s,
					isDoc: !active.isDoc,
				}))
			}
		>
			<BookIcon className='text-ctbg cursor-pointer' width='40' height='40' />
			<div className='font-bold ml-6 line-clamp-1'>Document</div>
		</div>
	);
};

export default DocBar;
