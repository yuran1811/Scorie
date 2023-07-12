import { fakeDocData } from '@/services';
import { IconCollection, LoadingCollection } from '@cpns/icons';
import { FC } from 'react';
import { DocItem } from './DocItem';

export const DocInfo: FC = () => (
  <div className="flexcentercol scrollY h-4/5 w-full !justify-start px-3 pb-8">
    <ul className="w-full">
      <li className="typo-sm my-8 space-y-8 rounded-3xl bg-slate-900 p-6 text-slate-50">
        <div>
          <div className="mb-4 px-4 font-bold">Loading</div>
          <LoadingCollection />
        </div>
        <div>
          <div className="mb-4 px-4 font-bold">Icons</div>
          <IconCollection />
        </div>
      </li>
      {fakeDocData.map((_) => (
        <li key={_.id} className="w-full cursor-pointer">
          <DocItem data={_} />
        </li>
      ))}
    </ul>
  </div>
);
