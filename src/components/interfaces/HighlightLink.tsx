import { ctUnderline } from 'utils';
import { FC, HTMLProps } from 'react';

interface HighlightLinkProps {
	url: string;
	animate?: boolean;
}

export const HighlightLink: FC<HighlightLinkProps & HTMLProps<HTMLAnchorElement>> = ({ children, url, animate = false }) => (
	<a
		className={`relative text-ctlinkcolor font-semibold ${ctUnderline} after:transition-all after:duration-300 after:ease-in-out after:origin-center ${
			animate ? 'after:scale-x-0 hover:after:scale-x-100' : ''
		}`}
		href={url || '/'}
		target='_blank'
		rel='noopener noreferrer'
	>
		{children}
	</a>
);
