import React, { FC } from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface TooltipProps {
	content?: string;
	options?: TippyProps;
}

export const Tooltip: FC<TooltipProps> = ({ children, content, options }) => (
	<div>
		<Tippy {...options} content={content || 'Tooltip'}>
			<div>{children}</div>
		</Tippy>
	</div>
);
