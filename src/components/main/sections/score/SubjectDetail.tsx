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
import { FullScreenLoading } from 'components/shared';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { deleteSubject, editSubject, validateSubjectOption } from 'services';
import { ScoreDetailType, SubjectDetailType } from 'shared';
import { useStore } from 'store';
import { ScoreAddNew } from './ScoreAddNew';
import { ScoreContainer } from './ScoreContainer';

interface SubjectDetailProps {
	subject: SubjectDetailType | undefined;
	scores: ScoreDetailType[];
	averageScore: string | number;
	loading: boolean;
	setOpenDetail: Dispatch<SetStateAction<boolean>>;
}

export const SubjectDetail: FC<SubjectDetailProps> = ({ subject, scores, averageScore, loading, setOpenDetail }) => {
	const currentUser = useStore((s) => s.currentUser);

	const [timeoutId, setTimeoutId] = useState<any>();
	const [saveErr, setSaveErr] = useState('');
	const [viewMode, setViewMode] = useState('all');
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

		editSubject(currentUser.uid, subject.id, { ...scoreOptions })
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
		const resp = deleteSubject(currentUser.uid, subject.id);
	}, [subject, scores]);

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
	}, []);

	return createPortal(
		<>
			{loading ? (
				<FullScreenLoading />
			) : (
				<div className='z-20 !fixed !top-0 !left-0 !w-[100vw] !h-[100vh] font-bold text-center text-rose-600 bg-violet-200 overflow-x-hidden overflow-y-auto'>
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

					{saveErr && <ErrorMessage extraStyle='text-[5rem]' content={saveErr} />}

					<div className='flexcentercol px-8 py-8'>
						<div className='text-[5rem] text-center text-teal-700 w-full line-clamp-1'>
							{subject?.name || ''}
						</div>
						<div className='text-[8rem] text-center text-red-600 w-full line-clamp-1'>{averageScore}</div>

						<div className='flex items-center justify-between w-full text-slate-800 bg-violet-200'>
							<div className='font-bold text-[4rem] text-left w-full px-6 line-clamp-1'>Recents</div>
							<div className='flex items-start justify-end'>
								<AddIcon
									className={`cursor-pointer mx-5`}
									width='50'
									height='50'
									onClick={() => setAddNewOpen(true)}
								/>
								{addNewOpen && <ScoreAddNew id={subject?.id} onClick={() => setAddNewOpen(false)} />}

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
							<ScoreContainer viewMode={viewMode} scores={scores} subject={subject} typeList={typeList} />
						</div>
					</div>
				</div>
			)}
		</>,
		document.getElementById('modal-container') as HTMLElement
	);
};
