import { FC } from 'react';
import { AnchorProps } from 'shared';
import { customStyle } from 'utils';

interface HighlightLinkProps {
	url: string;
	animate?: boolean;
}

const { underline } = customStyle;

export const HighlightLink: FC<HighlightLinkProps & AnchorProps> = ({ children, url, animate = false }) => (
	<a
		className={`relative text-ctlinkcolor font-semibold ${underline} after:transition-all after:duration-300 after:ease-in-out after:origin-center ${
			animate ? 'after:scale-x-0 hover:after:scale-x-100' : ''
		}`}
		href={url || '/'}
		target='_blank'
		rel='noopener noreferrer'
	>
		{children}
	</a>
);
