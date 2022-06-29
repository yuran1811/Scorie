import { ToolIcon } from 'components/icons/ToolIcon';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';

export const ToolsSectionBar = () => {
	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter flex-wrap'>
				<Title Icon={ToolIcon} content='Tools' />
			</div>

			<SectionSwiper></SectionSwiper>
		</div>
	);
};
