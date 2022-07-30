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
      console.log('reader load');
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
    console.log(inputRef.current);
    if (!inputRef.current || !inputRef.current?.files) return;

    const reader = new FileReader();
    reader.readAsText(inputRef.current.files[0]);
    reader.onload = onReaderLoad;
  }, []);

  return (
    <div className="flexcentercol mt-[2rem] h-4/5 w-full !justify-start overflow-y-auto overflow-x-hidden p-3 pb-8">
      <div className="flexcenter w-full">
        <a href={backupData} download={backupData ? 'scorie_backup.json' : ''}>
          <Button className="!text-[3rem]" content="Get backup data">
            <DownloadIcon className="m-4" width="50" height="50" />
          </Button>
        </a>
      </div>

      <div className="flexcenter mt-12 w-full">
        <div>
          <div className="p-4 text-center text-[2.5rem] font-semibold">
            {t('import data from backup file')}
          </div>

          <input
            ref={inputRef}
            className={`${inputClass} cursor-pointer`}
            type="file"
            accept=".json"
            title="log in"
            onChange={handleChange}
          />

          {openModal && !loading && (
            <Button className="!text-[3rem]" content="Import" onClick={() => saveToDB()} />
          )}
          {loading && (
            <div className="flexcenter my-6">
              <ThreeDotsFade />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
