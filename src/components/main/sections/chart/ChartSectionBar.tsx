import { ChartIcon } from 'components/icons';
import { ChartCard } from './ChartCard';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';

export const ChartSectionBar = () => {
	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter flex-wrap'>
				<Title Icon={ChartIcon} content='Analytics' />
			</div>

			<SectionSwiper
				Slide={ChartCard}
				breakpoints={{
					1080: { slidesPerView: 3 },
					640: { slidesPerView: 2 },
					0: { slidesPerView: 1 },
				}}
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
