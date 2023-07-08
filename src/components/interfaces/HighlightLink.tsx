import { AnchorProps } from '@/shared';
import { customStyle } from '@/utils';
import { FC } from 'react';

interface HighlightLinkProps {
  url: string;
  animate?: boolean;
  noUnderline?: boolean;
}

const { underline } = customStyle;

export const HighlightLink: FC<HighlightLinkProps & AnchorProps> = ({
  children,
  url,
  animate = false,
  noUnderline = false,
}) => (
  <a
    className={`text-ctlinkcolor relative font-semibold ${
      noUnderline ? '' : underline
    } after:origin-center after:transition-all after:duration-300 after:ease-in-out ${
      animate ? 'after:scale-x-0 hover:after:scale-x-100' : ''
    }`}
    href={url || '/'}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);
