import { GH_LINK } from '@/shared';
import { GradientText, GradientUnderline, HighlightLink } from '@cpns/interfaces';
import { FC } from 'react';

export const Footer: FC = () => (
  <footer className="relative w-full px-[1rem] pb-[3rem] pt-[1rem] text-center text-[3rem] font-semibold">
    Made by{' '}
    <HighlightLink url={GH_LINK} noUnderline>
      <GradientText>
        yuran1811
        <GradientUnderline />
      </GradientText>
    </HighlightLink>
  </footer>
);
