import { ChartIcon } from 'components/icons';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';

export const ChartSectionBar = () => {
	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter flex-wrap'>
				<Title Icon={ChartIcon} content='Analytics' />
			</div>

			<SectionSwiper></SectionSwiper>
		</div>
	);
};
