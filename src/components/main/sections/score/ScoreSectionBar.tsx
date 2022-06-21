import { HashtagIcon } from 'components/icons';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';

export const ScoreSectionBar = () => {
	return (
		<div className='w-full my-[2rem]'>
			<Title Icon={HashtagIcon} content='Score' />
			<SectionSwiper />
		</div>
	);
};
