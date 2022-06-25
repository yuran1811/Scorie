import { FC } from 'react';
import { fakeDocData } from 'services';
import { DocItem } from './DocItem';

export const DocInfo: FC = () => {
	return (
		<div className='flexcentercol !justify-start px-3 pb-8 w-full h-[80%] overflow-x-hidden overflow-y-auto'>
			<ul className='w-full'>
				{fakeDocData.map((_) => (
					<li className='cursor-pointer w-full' key={_.id}>
						<DocItem data={_} />
					</li>
				))}
			</ul>
		</div>
	);
};
