import { GH_REPO } from '@/shared';
import { GradientText, GradientUnderline, HighlightLink } from '@cpns/interfaces';
import { FC } from 'react';

export const Footer: FC = () => (
  <footer className="typo-sm relative w-full px-[1rem] pb-[3rem] pt-[1rem] text-center font-semibold">
    Made by{' '}
    <HighlightLink url={GH_REPO} noUnderline>
      <GradientText>
        yuran1811
        <GradientUnderline />
      </GradientText>
    </HighlightLink>
  </footer>
);
