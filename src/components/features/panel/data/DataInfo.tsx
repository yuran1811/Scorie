import { addNewNote, addNewSubject } from '@/services';
import { useStore } from '@/store';
import { BackupDataType, createDownloadBackupData } from '@/utils';
import { DownloadIcon, ThreeDotsFade } from '@cpns/icons';
import { Button, inputClass } from '@cpns/shared';
import { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const DataInfo: FC = () => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const backupData = createDownloadBackupData();

  const handleChange = (e: any) => setOpenModal(!!e.target.files && !!e.target.files.length);
  const onReaderLoad = useCallback(
    (e: any) => {
      if (!currentUser || !currentUser?.uid) return;

      setLoading(true);
      const { scores, notes } = JSON.parse(e.target.result) as BackupDataType;
      Promise.allSettled([
        ...(scores ? scores.map((score) => addNewSubject(currentUser.uid, { ...score })) : []),
        ...(notes ? notes.map((note) => addNewNote(currentUser.uid, { ...note })) : []),
      ])
        .then(() => {
          inputRef.current?.files && (inputRef.current.files = null);
          setOpenModal(false);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [currentUser]
  );
  const saveToDB = useCallback(() => {
    if (!inputRef.current || !inputRef.current?.files) return;

    const reader = new FileReader();
    reader.readAsText(inputRef.current.files[0]);
    reader.onload = onReaderLoad;
  }, []);

  return (
    <div className="flexcentercol mt-12 h-[calc(100%-4rem)] w-full !justify-start overflow-y-auto overflow-x-hidden">
      <div className="flexcenter w-full">
        <a href={backupData} download={backupData ? 'scorie_backup.json' : ''}>
          <Button content="Get backup data">
            <DownloadIcon className="mr-4" width="20" height="20" />
          </Button>
        </a>
      </div>

      <div className="flexcentercol typo-sm mt-12 w-full">
        <label className="cursor-pointer p-4 text-center font-semibold" htmlFor="file-input">
          {t('import data from backup file')}
        </label>

        <input
          ref={inputRef}
          id="file-input"
          className={`!max-w-[24rem] cursor-pointer ${inputClass}`}
          type="file"
          accept=".json"
          multiple
          onChange={handleChange}
        />

        {openModal && !loading && <Button content="Import" onClick={() => saveToDB()} />}
        {loading && (
          <div className="flexcenter my-6">
            <ThreeDotsFade />
          </div>
        )}
      </div>
    </div>
  );
};
