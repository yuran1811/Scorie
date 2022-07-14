import { BackupDataType, createDownloadBackupData } from 'utils';
import { Button, Input } from 'components/shared';
import { DownloadIcon } from 'components/icons';
import { FC } from 'react';
import { useStore } from 'store';
import { addNewNote, addNewSubject } from 'services';

export const DataInfo: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	const backupData = createDownloadBackupData();

	const onReaderLoad = (e: any) => {
		if (!currentUser || !currentUser?.uid) return;

		const { scores, notes } = JSON.parse(e.target.result) as BackupDataType;
		if (scores) Promise.allSettled(scores.map((score) => addNewSubject(currentUser.uid, { ...score })));
		if (notes) Promise.allSettled(notes.map((note) => addNewNote(currentUser.uid, { ...note })));
	};

	const handleChange = (e: any) => {
		const reader = new FileReader();
		reader.readAsText(e.target.files[0]);
		reader.onload = onReaderLoad;
	};

	return (
		<div className='flexcentercol !justify-start mt-[2rem] p-3 pb-8 w-full h-[80%] overflow-x-hidden overflow-y-auto'>
			<div className='flexcenter w-full'>
				<a href={backupData} download={backupData ? 'scorie_backup.json' : ''}>
					<Button className='!text-[3rem]' content='Get backup data'>
						<DownloadIcon className='m-4' width='50' height='50' />
					</Button>
				</a>
			</div>

			<div className='flexcenter w-full mt-12'>
				<div>
					<div className='font-semibold text-[2.8rem] text-center p-4'>Import data from backup file</div>
					<Input className='cursor-pointer' type='file' accept='.json' onChange={handleChange} />
				</div>
			</div>
		</div>
	);
};
