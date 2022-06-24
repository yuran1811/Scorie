import { CloseIcon, ImportantIcon, ListAllIcon, ListIcon, StarIcon } from 'components/icons';
import { useScoreDetail } from 'contexts/ScoreDetailContext';
import { FC, useCallback, useMemo, useState } from 'react';

export const ScoreDetail: FC = () => {
	const {
		viewDetail: { data, isOpened },
		setViewDetail,
	} = useScoreDetail();

	const { isVital, isSpecial, subject, scores } = data;

	const averageScore = useMemo(() => {
		return scores?.reduce(
			(prevValue, score) => {
				if (score.isIgnored) return prevValue;
				return { total: prevValue.total + score.base * score.value, count: prevValue.count + score.base };
			},
			{ total: 0, count: 0 }
		);
	}, [scores]);

	const getTypeList = useCallback(() => {
		const list: {
			[key: string]: boolean;
		} = {};

		scores.forEach((_) => {
			list[_.type] = true;
		});

		return list;
	}, [scores]);

	const [viewMode, setViewMode] = useState('all');

	return (
		<>
			{isOpened && (
				<div className='z-20 !fixed top-0 left-0 w-[100vw] h-[100vh] font-bold text-center text-rose-700 bg-violet-200 overflow-x-hidden overflow-y-auto'>
					<div className='flexcenter sticky top-0 left-0 p-8 bg-violet-200'>
						<StarIcon className='cursor-pointer mx-5' fill={!isSpecial ? 'white' : '#d97706'} width='50' height='50' />
						<ImportantIcon className='cursor-pointer mx-5' fill={!isVital ? 'white' : '#57534e'} width='50' height='50' />
						<CloseIcon
							className='cursor-pointer absolute right-3 tablet:right-6 top-[50%] translate-y-[-50%] mx-4'
							width='50'
							height='50'
							onClick={() =>
								setViewDetail &&
								setViewDetail({
									data,
									isOpened: false,
								})
							}
						/>
					</div>

					<div className='flexcentercol p-8'>
						<div className='font-bold text-[5rem] text-center text-teal-700 w-full line-clamp-1'>{subject}</div>
						<div className='font-bold text-[8rem] text-center text-red-600 w-full line-clamp-1'>
							{(averageScore.total / averageScore.count).toFixed(2)}
						</div>

						<div className='flex items-center justify-between w-full text-slate-800'>
							<div className='font-bold text-[4rem] text-left w-full px-6 line-clamp-1'>Recents</div>
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
						<div className='flexcenter flex-wrap w-full pb-6'>
							{viewMode === 'all' ? (
								<>
									{scores.map((_) => (
										<div key={_.id} className='bg-indigo-900 px-10 py-4 rounded-[2rem] m-6'>
											<div className='w-full text-[3.5rem] text-white'>{_.type}</div>
											<div className='w-full text-[4.5rem] text-sky-200'>{_.value}</div>
										</div>
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
												{scores
													.filter((score) => score.type === _)
													.map((score) => (
														<div key={score.id} className='bg-indigo-900 px-12 py-6 rounded-[2rem] m-6'>
															<div className='w-full text-[4rem] text-sky-200'>{score.value}</div>
														</div>
													))}
											</div>
										</div>
									))}
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
