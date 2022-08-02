import { GH_LINK } from '@/shared';
import { HighlightLink } from '@cpns/interfaces';
import { FC } from 'react';

export const Footer: FC = () => (
  <footer className="relative w-full px-[1rem] pt-[1rem] pb-[2rem] text-center text-[3rem] font-semibold">
    Made by <HighlightLink url={GH_LINK}>yuran1811</HighlightLink>
  </footer>
);
