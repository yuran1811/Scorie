import { FlatLoading } from 'components/icons';
import { FC } from 'react';

export const FullScreenLoading: FC = () => (
	<div className='z-40 fullscreen bg-slate-900'>
		<FlatLoading />
	</div>
);
