import { DivProps } from '@/shared';
import { QuoteIcon } from '@cpns/icons';
import { FC } from 'react';

export const BlockQuoteSkeleton: FC<DivProps> = () => (
  <blockquote className="relative mx-auto max-w-[68rem] bg-gray-800 p-12 rounded-[2rem]">
    <QuoteIcon className="absolute top-[2rem] left-[2rem] text-gray-700" width="80" height="80" />

    <div className="relative p-8">
      <p className="w-full h-[10rem] rounded-[1rem] bg-slate-700 animate-pulse" />
    </div>

    <footer className="p-8 mt-2">
      <p className="w-full h-[4rem] rounded-[1rem] bg-slate-700 animate-pulse" />
    </footer>
  </blockquote>
);
