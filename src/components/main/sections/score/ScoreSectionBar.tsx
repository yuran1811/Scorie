import { HashtagIcon } from 'components/icons';
import { ScoreCard } from './ScoreCard';
import { SectionSwiper } from '../SectionSwiper';
import { Title } from '../Title';
import { fakeUser } from 'services';

export const ScoreSectionBar = () => {
	const { scores } = fakeUser[0];

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<Title Icon={HashtagIcon} content='Score' />
			<SectionSwiper Slide={ScoreCard} slideChilds={scores} />
		</div>
	);
};
