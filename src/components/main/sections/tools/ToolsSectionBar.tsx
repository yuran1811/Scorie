import { ToolIcon } from 'components/icons/ToolIcon';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';

export const ToolsSectionBar = () => {
	return (
		<div className='w-full my-[2rem]'>
			<Title Icon={ToolIcon} content='Tools' />
			<SectionSwiper />
		</div>
	);
};
