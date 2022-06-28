import {
	CloseIcon,
	IgnoreIcon,
	ImportantIcon,
	ListAllIcon,
	ListIcon,
	PlusIcon,
	StarIcon,
	TrashIcon,
} from 'components/icons';
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useDocumentQuery } from 'hooks';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { db, ScoreDetailType } from 'shared';
import { useStore } from 'store';

export const ScoreDetail: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	const { subjectId } = useParams();
	const navigate = useNavigate();

	const { data } = useDocumentQuery(
		'score_detail',
		doc(db, 'users', currentUser?.uid as string, 'scores', subjectId as string)
	);

	const [subject, setSubject] = useState<ScoreDetailType>();

	const averageScore = useMemo(() => {
		if (!subject || !subject?.scores) return { total: 0, count: 0 };

		return subject.scores.reduce(
			(prevValue, score) => {
				if (score.isIgnored) return prevValue;
				return { total: +prevValue.total + +score.base * +score.value, count: +prevValue.count + +score.base };
			},
			{ total: 0, count: 0 }
		);
	}, [subject]);

	const addScoreRecord = () => {
		if (!currentUser || !currentUser?.uid) return;

		updateDoc(doc(db, 'users', currentUser.uid, 'scores', subjectId as string), {
			scores: arrayUnion({
				id: `score-${Math.floor(Math.random() * 1000) + 10}`,
				isIgnored: false,
				base: 1,
				type: '15mins',
				value: Math.floor(Math.random() * 4) + 7,
			}),
		});
	};

	const removeScoreRecord = useCallback(() => {
		if (!currentUser || !currentUser?.uid) return;

		deleteDoc(doc(db, 'users', currentUser.uid, 'scores', subjectId as string));
	}, [data]);

	const getTypeList = useCallback(() => {
		if (!subject?.scores) return {};

		const list: {
			[key: string]: boolean;
		} = {};

		subject.scores.forEach((_) => {
			list[_.type] = true;
		});

		return list;
	}, [subject?.scores]);

	const [viewMode, setViewMode] = useState('all');
	const [scoreOptions, setScoreOptions] = useState({
		isIgnored: subject?.isIgnored || false,
		isSpecial: subject?.isSpecial || false,
		isVital: subject?.isVital || false,
	});

	useEffect(() => {
		setSubject((data?.data() as ScoreDetailType) || {});
	}, [data]);

	useEffect(() => {
		subject && setScoreOptions(subject);
		console.log(subject?.id);
	}, [subject]);

	return (
		<div className='z-20 !fixed top-0 left-0 w-[100vw] h-[100vh] font-bold text-center text-rose-600 bg-violet-200 overflow-x-hidden overflow-y-auto'>
			<div className='sticky top-0 left-0 right-0 flex items-center justify-between p-8 bg-violet-200'>
				<div className='flexcenter flex-wrap w-full mobile:pl-24'>
					<StarIcon
						className='cursor-pointer mx-5'
						fill={!scoreOptions.isSpecial ? 'white' : '#d97706'}
						width='50'
						height='50'
						onClick={() => setScoreOptions((s) => ({ ...s, isSpecial: !s.isSpecial }))}
					/>
					<ImportantIcon
						className='cursor-pointer mx-5'
						fill={!scoreOptions.isVital ? 'white' : '#57534e'}
						width='50'
						height='50'
						onClick={() => setScoreOptions((s) => ({ ...s, isVital: !s.isVital }))}
					/>
					<IgnoreIcon
						className='cursor-pointer mx-5'
						fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
						width='50'
						height='50'
						onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
					/>
					<TrashIcon
						className='cursor-pointer mx-5 text-slate-500'
						width='45'
						height='45'
						onClick={() => {
							removeScoreRecord();
							navigate(-1);
						}}
					/>
				</div>

				<CloseIcon className='cursor-pointer mx-4' width='50' height='50' onClick={() => navigate(-1)} />
			</div>

			<div className='flexcentercol px-8 py-8'>
				<div className='text-[5rem] text-center text-teal-700 w-full line-clamp-1'>
					{subject?.subject || 'Nothing to show'}
				</div>
				<div className='text-[8rem] text-center text-red-600 w-full line-clamp-1'>
					{!averageScore.count ? '' : (averageScore.total / averageScore.count).toFixed(2)}
				</div>

				<div className='flex items-center justify-between w-full text-slate-800 bg-violet-200'>
					<div className='font-bold text-[4rem] text-left w-full px-6 line-clamp-1'>Recents</div>
					<div className='flex items-start justify-end'>
						<PlusIcon
							className='cursor-pointer mx-5'
							width='50'
							height='50'
							onClick={() => addScoreRecord()}
						/>

						<ListIcon
							className={`${viewMode === 'group' ? 'block' : 'hidden'} cursor-pointer mx-5`}
							width='50'
							height='50'
							onClick={() => setViewMode('all')}
						/>
						<ListAllIcon
							className={`${viewMode === 'all' ? 'block' : 'hidden'} cursor-pointer mx-5`}
							width='50'
							height='50'
							onClick={() => setViewMode('group')}
						/>
					</div>
				</div>
				<div className='flexcenter flex-wrap w-full pb-6'>
					{viewMode === 'all' ? (
						<>
							{subject?.scores?.map((_) => (
								<Link key={_.id} to={_.id}>
									<div className='bg-indigo-900 px-10 py-4 rounded-[2rem] m-6'>
										<div className='w-full text-[3.5rem] text-white'>{_.type}</div>
										<div className='w-full text-[4.5rem] text-sky-200'>{_.value}</div>
									</div>
								</Link>
							))}
						</>
					) : (
						<>
							{Object.keys(getTypeList()).map((_) => (
								<div key={_} className='w-full mt-6 mb-16'>
									<div className='w-full text-left text-[4rem] indent-[3rem] border-l-[1rem] border-current'>
										{_}
									</div>
									<div className='w-full flexcenter !justify-start flex-wrap'>
										{subject?.scores
											?.filter((score) => score.type === _)
											?.map((score) => (
												<Link key={score.id} to={score.id}>
													<div className='bg-indigo-900 px-12 py-6 rounded-[2rem] m-6'>
														<div className='w-full text-[4rem] text-sky-200'>
															{score.value}
														</div>
													</div>
												</Link>
											))}
									</div>
								</div>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};
