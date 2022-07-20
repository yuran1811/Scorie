import { DocDataType } from '@/shared';

export const fakeDocData: DocDataType[] = [
  {
    id: 'doc-1',
    title: 'Account',
    data: [
      'You can sign in with Google, Facebook account or email / password.',
      `With Facebook and email / password sign in method, it's compulsory to verify email before using this app.`,
      'Only username, password and avatar can be changed.',
    ],
    lastUpdate: '6/7/2022',
  },
  {
    id: 'doc-2',
    title: 'Note',
    data: [
      `This feature is familiar with Google Keep, so it's not difficult for you to get acquainted with. If not, don't be worried`,
      `You can pin, archive notes and change the status (is done, is in progress) of notes`,
      `You can also drag and drop, change themes of these notes`,
      `Notice: By default, one note can't be both done and in progress`,
    ],
    lastUpdate: '1/1/2022',
  },
  {
    id: 'doc-3',
    title: 'Score',
    data: [],
    lastUpdate: '1/1/2022',
  },
  {
    id: 'doc-4',
    title: 'Analytics',
    data: ['Variant of charts'],
    lastUpdate: '1/1/2022',
  },
  {
    id: 'doc-5',
    title: 'Tools',
    data: ['Tools help school life be better and controlled'],
    lastUpdate: '1/1/2022',
  },
];
