import { NoteDetailType, STORE_NAME, SubjectDetailType } from '@/shared';

export interface BackupDataType {
  scores: SubjectDetailType[];
  notes: NoteDetailType[];
}

export const getStoredData = () => {
  const localData = localStorage.getItem(STORE_NAME) || '';

  return localData;
};

export const createDownloadBackupData = () => {
  const rawData = getStoredData();
  if (!rawData.length) return '#data-is-unavailable';

  const {
    state: data,
  }: {
    state: BackupDataType;
  } = JSON.parse(rawData);

  const backupData = JSON.stringify({
    scores: data.scores.map(({ id, createdAt, updatedAt, isIgnored, ..._ }) => _),
    notes: data.notes.map(({ id, createdAt, updatedAt, ..._ }) => _),
  });

  return `data:text/json;charset=utf-8,${encodeURIComponent(backupData)}`;
};

export const importBackupData = () => {};
