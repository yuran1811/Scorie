import { useStore } from 'store';
import { deepObjectCompare } from 'utils';
import { ScoreDetailType, SubjectDetailType } from 'shared';
import { deleteSubject, editSubject, validateSubjectOption } from 'services';
import { ScoreContainer } from './ScoreContainer';
import { ScoreAddNew } from './ScoreAddNew';
import {
	AddIcon,
	CloseIcon,
	IgnoreIcon,
	ImportantIcon,
	ListAllIcon,
	ListIcon,
	StarIcon,
	TrashIcon,
} from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { FullScreenLoading, TimeContainer } from 'components/shared';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

interface SubjectDetailProps {
	subject: SubjectDetailType | undefined;
	scores: ScoreDetailType[];
	averageScore: string | number;
	loading: boolean;
	setOpenDetail: Dispatch<SetStateAction<boolean>>;
}

export const SubjectDetail: FC<SubjectDetailProps> = ({ subject, scores, averageScore, loading, setOpenDetail }) => {
	const currentUser = useStore((s) => s.currentUser);

	const [saveErr, setSaveErr] = useState('');
	const [viewMode, setViewMode] = useState('all');
	const [timeoutId, setTimeoutId] = useState<any>();
	const [addNewOpen, setAddNewOpen] = useState(false);
	const [scoreOptions, setScoreOptions] = useState({
		isIgnored: subject?.isIgnored || false,
		isSpecial: subject?.isSpecial || false,
		isVital: subject?.isVital || false,
	});

	const updateSubjectData = useCallback(() => {
		if (!currentUser || !currentUser?.uid || !subject?.id) return;

		const isError = validateSubjectOption({ ...scoreOptions });
		if (isError) {
			setSaveErr('Subject cannot be both ignored and vital (or special)');
			return;
		}

		if (deepObjectCompare(subject, { ...subject, ...scoreOptions, scores: [...scores] })) {
			setSaveErr('');
			setOpenDetail(false);
			return;
		}

		editSubject(currentUser.uid, subject.id, { ...scoreOptions, scores: [...scores] })
			.then(() => {
				setSaveErr('');
				setOpenDetail(false);
			})
			.catch(() => {
				setSaveErr('Fail to update');
				clearTimeout(timeoutId);

				setTimeoutId(
					setTimeout(() => {
						setOpenDetail(false);
					}, 2000)
				);
			});
	}, [subject, scoreOptions]);

	const removeSubjectRecord = useCallback(() => {
		if (!currentUser || !currentUser?.uid || !subject?.id) return;
		deleteSubject(currentUser.uid, subject.id);
	}, [subject]);

	const typeList = useMemo<string[]>(() => {
		if (!scores) return [] as string[];

		const list: {
			[key: string]: boolean;
		} = {};

		scores.forEach((_) => (list[_.type] = true));
		return Object.keys(list) as string[];
	}, [scores]);

	useEffect(() => {
		return () => clearTimeout(timeoutId);
	});

	return createPortal(
		<>
			{loading ? (
				<FullScreenLoading />
			) : (
				<div className='z-20 fullscreen font-bold text-center text-rose-600 bg-violet-200 scrollY'>
					<div className='sticky top-0 left-0 right-0 flex items-center justify-between p-8 bg-violet-200'>
						<div className='flexcenter flex-wrap w-full mobile:pl-24'>
							<StarIcon
								className='scale-75 mobile:scale-100 cursor-pointer m-[0.6rem] mobile:m-5'
								fill={!scoreOptions.isSpecial ? 'white' : '#d97706'}
								width='50'
								height='50'
								onClick={() => setScoreOptions((s) => ({ ...s, isSpecial: !s.isSpecial }))}
							/>
							<ImportantIcon
								className='scale-75 mobile:scale-100 cursor-pointer m-[0.6rem] mobile:m-5'
								fill={!scoreOptions.isVital ? 'white' : '#57534e'}
								width='50'
								height='50'
								onClick={() => setScoreOptions((s) => ({ ...s, isVital: !s.isVital }))}
							/>
							<IgnoreIcon
								className='scale-75 mobile:scale-100 cursor-pointer m-[0.6rem] mobile:m-5'
								fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
								width='50'
								height='50'
								onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
							/>
							<TrashIcon
								className='scale-75 mobile:scale-100 cursor-pointer m-[0.6rem] mobile:m-5 text-slate-500'
								width='45'
								height='45'
								onClick={() => removeSubjectRecord()}
							/>
						</div>

						<CloseIcon
							className='cursor-pointer mx-4'
							width='50'
							height='50'
							onClick={() => {
								updateSubjectData();
							}}
						/>
					</div>

					{saveErr && <ErrorMessage extraStyle='px-6 text-[3rem] mobile:text-[4rem]' content={saveErr} />}

					<TimeContainer
						className='mobile:text-[4rem]'
						obj={{ createdAt: subject?.createdAt, updatedAt: subject?.updatedAt }}
					/>

					<div className='flexcentercol px-8 py-8'>
						<div className='text-[5rem] text-center text-teal-700 w-full line-clamp-1'>
							{subject?.name || ''}
						</div>
						<div className='text-[8rem] text-center text-red-600 w-full line-clamp-1'>{averageScore}</div>

						<div className='flex items-center justify-between flex-wrap w-full text-slate-800 bg-violet-200'>
							<div className='font-bold text-[4rem] text-center smallmb:text-left w-full smallmb:w-auto px-6 line-clamp-1'>
								Recents
							</div>
							<div className='flex items-start justify-center smallmb:justify-end w-full smallmb:w-auto'>
								<AddIcon
									className={`cursor-pointer mx-5`}
									width='50'
									height='50'
									onClick={() => setAddNewOpen(true)}
								/>
								{addNewOpen && <ScoreAddNew subject={subject} onClick={() => setAddNewOpen(false)} />}

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
							<ScoreContainer viewMode={viewMode} typeList={typeList} subject={subject} scores={scores} />
						</div>
					</div>
				</div>
			)}
		</>,
		document.getElementById('modal-container') as HTMLElement
	);
};
