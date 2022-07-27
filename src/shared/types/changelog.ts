import { Timestamp } from 'firebase/firestore';

export interface ChangeLogProps {
  id?: string;
  content: string;
  time: Timestamp;
  title: string;
  type: string;
  version: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
