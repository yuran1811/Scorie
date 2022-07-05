import { BookIcon } from 'components/icons';
import { useDocPanel } from 'contexts';
import { DivProps } from 'shared';
import { FC } from 'react';

const DocBar: FC<DivProps> = (props) => {
	const { active, setActive } = useDocPanel();

	return (
		<div {...props} onClick={() => setActive && setActive(!active)}>
			<BookIcon className='text-ctbg cursor-pointer' width='40' height='40' />
			<div className='font-bold ml-6 line-clamp-1'>Document</div>
		</div>
	);
};

export default DocBar;
