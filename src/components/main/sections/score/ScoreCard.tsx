import { IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { useScoreDetail } from 'contexts';
import { collection, doc } from 'firebase/firestore';
import { useCollectionQuery, useDocumentQuery } from 'hooks';
import { FC, useEffect, useMemo, useState } from 'react';
import { db } from 'shared';
import { ScoreDetailType, SubjectCardProps, SubjectDetailType } from 'shared/types';
import { useStore } from 'store';
import { A11y } from 'swiper';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { standardizeCollectionData } from 'utils';
import { MAX_SCORE_RECENT_LTH } from '../../../../constants';

const swiperOptions: SwiperProps = {
	modules: [A11y],
	centeredSlides: false,
	breakpoints: { 0: { slidesPerView: 3 } },
	onSlideChange: ({ activeIndex }) => console.log(activeIndex),
};

export const ScoreCard: FC<SubjectCardProps> = ({ subject: { id: subjectId } }) => {
	const currentUser = useStore((s) => s.currentUser);

	const { setViewDetail } = useScoreDetail();

	const { data, loading } = useDocumentQuery(
		'users_subject',
		doc(db, 'users', currentUser?.uid as string, 'subjects', subjectId as string)
	);

	const { data: scoresData, loading: scoresLoading } = useCollectionQuery(
		'users_subjects_scores',
		collection(db, 'users', currentUser?.uid as string, 'subjects', subjectId as string, 'scores')
	);

	const [subject, setSubject] = useState<SubjectDetailType>();
	const [scores, setScores] = useState<ScoreDetailType[]>([] as ScoreDetailType[]);

	const averageScore = useMemo(() => {
		if (!scores) return { total: 0, count: 0 };

		return scores.reduce(
			(prevValue, score) => {
				if (score.isIgnored) return prevValue;
				return {
					total: +prevValue.total + +score.base * +score.value,
					count: +prevValue.count + +score.base,
				};
			},
			{ total: 0, count: 0 }
		);
	}, [subject]);

	useEffect(() => {
		if (loading || !data) return;

		const newSubject = data?.data() as SubjectDetailType;
		setSubject(newSubject || {});
	}, [data, loading]);

	useEffect(() => {
		if (!scoresData || scoresLoading) return;

		const newScores = standardizeCollectionData(scoresData) as ScoreDetailType[];
		setScores(newScores || []);
	}, [scoresData, scoresLoading]);

	return (
		<div
			className='cursor-pointer tablet:max-w-[25rem] w-full p-4 rounded-[2.5rem] font-bold text-center text-rose-600 bg-violet-200'
			onClick={() => setViewDetail && setViewDetail({ id: subjectId, isOpened: true })}
		>
			<div className='flexcenter p-4'>
				<StarIcon
					className='mx-4'
					fill={subject && !subject.isSpecial ? 'white' : '#d97706'}
					width='40'
					height='40'
				/>
				<ImportantIcon
					className='mx-4'
					fill={subject && !subject.isVital ? 'white' : '#57534e'}
					width='40'
					height='40'
				/>
				<IgnoreIcon
					className='mx-4'
					fill={subject && !subject.isIgnored ? 'white' : '#0891b2'}
					width='40'
					height='40'
				/>
			</div>

			<div className='flexcentercol'>
				<div className='font-bold text-[3.5rem] text-center text-teal-700 w-full line-clamp-1'>
					{subject?.name || ''}
				</div>
				<div className='font-bold text-[5rem] text-center text-red-600 w-full line-clamp-1'>
					{!averageScore.count ? '' : (averageScore.total / averageScore.count).toFixed(2)}
				</div>

				<div className='font-bold text-[3.5rem] text-slate-800 text-left w-full px-8 line-clamp-1'>Recents</div>
				{scores.length ? (
					<ReactSwiper {...swiperOptions} className='flex items-center w-full text-sky-700'>
						{scores.slice(-MAX_SCORE_RECENT_LTH).map((_) => (
							<SwiperSlide key={_.id}>
								<div className='w-[7rem] h-[6rem] p-3 text-center'>{_.value}</div>
							</SwiperSlide>
						))}
						{scores.length > MAX_SCORE_RECENT_LTH && (
							<SwiperSlide>
								<div className='w-[7rem] h-[6rem] p-3 text-center'>...</div>
							</SwiperSlide>
						)}
					</ReactSwiper>
				) : (
					<div className='font-semibold text-[3rem] text-slate-800 text-center w-full px-8 line-clamp-1'>
						Nothing here
					</div>
				)}
			</div>
		</div>
	);
};
