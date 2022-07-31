import { fakeDocData } from '@/services';
import { DocItem } from './DocItem';
import { FC } from 'react';

export const DocInfo: FC = () => (
  <div className="flexcentercol scrollY h-4/5 w-full !justify-start px-3 pb-8">
    <ul className="w-full">
      {fakeDocData.map((_) => (
        <li key={_.id} className="w-full cursor-pointer">
          <DocItem data={_} />
        </li>
      ))}
    </ul>
  </div>
);
