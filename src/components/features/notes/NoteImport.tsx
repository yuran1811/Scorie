import { addNewNote, updateIdxList } from '@/services';
import { NoteDetailType } from '@/shared';
import { useStore } from '@/store';
import { AddIcon } from '@cpns/icons';
import { Input } from '@cpns/shared';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface NoteImportProps {
  showImport: boolean;
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

const NoteImport: FC<NoteImportProps> = ({ showImport, setShowImport }) => {
  const noteIdxList = useStore((s) => s.noteIdxList);
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

  return (
    <div
      className={`${!showImport ? '!hidden' : 'z-10'} ${
        isError ? 'bg-rose-400' : 'bg-indigo-200'
      } flexcenter absolute bottom-[-9rem] right-0 w-[70vw] min-w-[10rem] max-w-[40rem] flex-wrap rounded-[3rem] p-2 pr-4`}
    >
      <div className="flex-1">
        <Input
          className="mx-2 focus:!border-indigo-400"
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
      </div>
      <div className="cursor-pointer" onClick={onClickHandle}>
        <AddIcon width="50" height="50" fill="#4338ca" />
      </div>
    </div>
  );
};

export default NoteImport;
