import { fakeDocData } from '@/services';
import { LoadingCollection } from '@cpns/icons';
import { GradientUnderline } from '@cpns/interfaces';
import { InlineLoading } from '@cpns/shared';
import { FC, Suspense, lazy } from 'react';
import { DocItem } from './DocItem';

const IconCollection = lazy(() => import('@cpns/icons/IconCollection'));

export const DocInfo: FC = () => (
  <div className="flexcentercol scrollY mt-12 h-[calc(100%-4rem)] w-full !justify-start">
    <ul className="w-full">
      <li className="typo-sm my-8 space-y-8 rounded-3xl bg-slate-900 p-6 text-slate-50">
        <div>
          <div className="mb-4 px-4 font-bold">Loading</div>
          <LoadingCollection />
        </div>
        <div>
          <div className="mb-4 px-4 font-bold">Icons</div>
          <Suspense fallback={<InlineLoading />}>
            <IconCollection />
          </Suspense>
        </div>
      </li>

      <GradientUnderline className="my-16" />

      {fakeDocData.map((_) => (
        <li key={_.id} className="w-full cursor-pointer">
          <DocItem data={_} />
        </li>
      ))}
    </ul>
  </div>
);
