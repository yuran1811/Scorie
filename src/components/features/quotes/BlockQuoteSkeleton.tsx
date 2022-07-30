import { DivProps } from '@/shared';
import { QuoteIcon } from '@cpns/icons';
import { FC } from 'react';

export const BlockQuoteSkeleton: FC<DivProps> = () => (
  <blockquote className="relative mx-auto max-w-[68rem] rounded-[2rem] bg-gray-800 p-12">
    <QuoteIcon className="absolute top-[2rem] left-[2rem] text-gray-700" width="80" height="80" />

    <div className="relative p-8">
      <p className="h-[10rem] w-full animate-pulse rounded-[1rem] bg-slate-700" />
    </div>

    <footer className="mt-2 p-8">
      <p className="h-[4rem] w-full animate-pulse rounded-[1rem] bg-slate-700" />
    </footer>
  </blockquote>
);
