import { addNewNote, updateIdxList } from '@/services';
import { NoteDetailType } from '@/shared';
import { useNoteStore, useStore } from '@/store';
import { AddIcon } from '@cpns/icons';
import { Input, Overlay } from '@cpns/shared';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

interface NoteImportProps {
  setShowImport: Dispatch<SetStateAction<boolean>>;
}

function isNoteData(obj: any): obj is NoteDetailType {
  return (
    'title' in obj &&
    'data' in obj &&
    'theme' in obj &&
    'isPinned' in obj &&
    'isArchived' in obj &&
    'isDone' in obj &&
    'isInProgress' in obj
  );
}

const NoteImport: FC<NoteImportProps> = ({ setShowImport }) => {
  const { t } = useTranslation();

  const noteIdxList = useNoteStore((s) => s.noteIdxList);
  const currentUser = useStore((s) => s.currentUser);

  const [isError, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const onClickHandle = async () => {
    try {
      if (!currentUser || !currentUser?.uid) return;

      const { id, ...data } = JSON.parse(inputValue);

      if (isNoteData(data)) {
        setError(false);
        const { data: resp } = await addNewNote(currentUser.uid, { ...data });

        if (resp && resp?.id) {
          await updateIdxList(currentUser.uid, [resp.id, ...noteIdxList.list], noteIdxList.id);
        }
      } else {
        setError(true);
      }

      setShowImport(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    setError(false);
  }, [inputValue]);

  return createPortal(
    <div className="fullscreen flexcenter">
      <Overlay zIdx="z-[1]" onClick={() => setShowImport(false)} />

      <div className="absolute z-[2] m-4 text-violet-300">
        <div className="typo-med m-6 p-2 text-center font-bold">{t('paste your shared content here')}</div>
        <div
          className={`${
            isError ? 'bg-rose-400' : 'bg-violet-600/80'
          } flexcenter mx-auto h-[7rem] max-w-2xl rounded-[3.9rem] px-2`}
        >
          <div className="flex-1">
            <Input
              className="mx-2 !max-w-full focus:!border-indigo-400"
              onChange={(e) => setInputValue(e.currentTarget.value)}
            />
          </div>
          <div className="cursor-pointer px-4" onClick={onClickHandle}>
            <AddIcon width="36" height="36" />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-container') as HTMLElement
  );
};

export default NoteImport;
