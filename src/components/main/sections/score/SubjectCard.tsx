import { IgnoreIcon, ImportantIcon, StarIcon, ThreeDotsFade } from 'components/icons';
import { LoadingCard } from 'components/shared';
import { collection, doc } from 'firebase/firestore';
import { useCollectionQuery, useDocumentQuery } from 'hooks';
import { FC, HTMLProps, useEffect, useMemo, useState } from 'react';
import { db } from 'shared';
import { ScoreDetailType, SubjectCardProps, SubjectDetailType } from 'shared/types';
import { useStore } from 'store';
import { A11y } from 'swiper';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { getAverageScore, getAverageScoreString, standardizeCollectionData } from 'utils';
import { MAX_SCORE_RECENT_LTH } from '../../../../constants';
import { SubjectDetail } from './SubjectDetail';

const swiperOptions: SwiperProps = {
	modules: [A11y],
	centeredSlides: false,
	breakpoints: { 0: { slidesPerView: 3 } },
	onSlideChange: ({ activeIndex }) => console.log(activeIndex),
};

export const SubjectCard: FC<SubjectCardProps & HTMLProps<HTMLDivElement>> = ({
	subject: { id: subjectId },
	setSubjectAverages,
}) => {
	const currentUser = useStore((s) => s.currentUser);
	const settings = useStore((s) => s.settings);

	const { data, loading } = useDocumentQuery(
		'users_subject',
		doc(db, 'users', currentUser?.uid as string, 'subjects', subjectId as string)
	);
	const { data: scoresData, loading: scoresLoading } = useCollectionQuery(
		'users_subjects_scores',
		collection(db, 'users', currentUser?.uid as string, 'subjects', subjectId as string, 'scores')
	);

	const [openDetail, setOpenDetail] = useState<boolean>(false);
	const [subject, setSubject] = useState<SubjectDetailType>({} as SubjectDetailType);
	const [scores, setScores] = useState<ScoreDetailType[]>([] as ScoreDetailType[]);

	const averageScore = useMemo(() => {
		if (!scores || !scores.length || scoresLoading) return '';

		const averageScoreRaw = getAverageScore(scores);
		const averageScoreString = getAverageScoreString(averageScoreRaw, settings.numberFormat);

		setSubjectAverages((s) => ({
			...s,
			[subject.name]: {
				averageScore: averageScoreRaw.count && averageScoreRaw.total / averageScoreRaw.count,
				isLoaded: scoresLoading,
			},
		}));

		return averageScoreString;
	}, [scores, scoresLoading, settings.numberFormat]);

	useEffect(() => {
		if (loading || !data) return;

		const newSubject = data?.data() as SubjectDetailType;
		setSubject({ ...newSubject, id: subjectId } || {});
	}, [data, loading]);

	useEffect(() => {
		if (!scoresData || scoresLoading) return;

		const newScores = standardizeCollectionData(scoresData) as ScoreDetailType[];
		setScores(newScores || []);
	}, [scoresData, scoresLoading]);

	return (
		<>
			{loading ? (
				<LoadingCard />
			) : (
				<div
					className='cursor-pointer tablet:max-w-[25rem] w-full p-4 rounded-[2.5rem] font-bold text-center text-rose-600 bg-violet-200'
					onClick={() => setOpenDetail((s) => !s)}
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
							{averageScore}
						</div>

						<div className='font-bold text-[3.5rem] text-slate-800 text-left w-full px-8 line-clamp-1'>
							Recents
						</div>

						{scoresLoading && (
							<div className='w-full flexcenter'>
								<ThreeDotsFade />
							</div>
						)}
						{scores.length ? (
							<ReactSwiper {...swiperOptions} className='flex items-center w-full text-sky-700'>
								{scores
									.slice(-MAX_SCORE_RECENT_LTH)
									.reverse()
									.map((_) => (
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
			)}

			{openDetail && (
				<SubjectDetail
					subject={subject}
					scores={scores}
					averageScore={averageScore}
					loading={loading}
					setOpenDetail={setOpenDetail}
				/>
			)}
		</>
	);
};
