import { ToolIcon } from 'components/icons/ToolIcon';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';
import { ToolCard } from './ToolCard';

export const ToolsSectionBar = () => {
	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter flex-wrap'>
				<Title Icon={ToolIcon} content='Tools' />
			</div>

			<SectionSwiper
				Slide={ToolCard}
				slideChilds={[
					{
						id: 1,
						name: 'Tool',
					},
					{
						id: 2,
						name: 'Tool',
					},
					{
						id: 3,
						name: 'Tool',
					},
					{
						id: 4,
						name: 'Tool',
					},
				]}
			/>
		</div>
	);
};
