import { ToolIcon } from 'components/icons/ToolIcon';
import { ToolCard } from './ToolCard';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';

export const ToolsSectionBar = () => {
	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<Title Icon={ToolIcon} content='Tools' />
			<SectionSwiper
				Slide={ToolCard}
				slideChilds={[
					{
						id: 1,
						name: 'Chart',
					},
					{
						id: 2,
						name: 'Chart',
					},
					{
						id: 3,
						name: 'Chart',
					},
					{
						id: 4,
						name: 'Chart',
					},
				]}
			/>
		</div>
	);
};
