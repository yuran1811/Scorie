import { fakeDocData } from 'services';
import { DocItem } from './DocItem';
import { FC } from 'react';

export const DocInfo: FC = () => (
	<div className='flexcentercol !justify-start px-3 pb-8 w-full h-[80%] scrollY'>
		<ul className='w-full'>
			{fakeDocData.map((_) => (
				<li className='cursor-pointer w-full' key={_.id}>
					<DocItem data={_} />
				</li>
			))}
		</ul>
	</div>
);
