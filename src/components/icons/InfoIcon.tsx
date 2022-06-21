import { FC, HTMLProps } from 'react';
import { Link } from 'react-router-dom';

interface InfoIconParams {
	url: string;
}

const beforeStyle =
	'before:content-[""] before:absolute before:bg-ctgoldlight before:w-[0.8rem] before:h-[0.8rem] before:top-[0.8rem] before:rounded-[50%]';
const afterStyle =
	'after:content-[""] after:absolute after:bg-ctgoldlight after:w-[0.8rem] after:h-[1.2rem] after:bottom-[0.8rem] after:rounded-[1rem]';

export const InfoIcon: FC<InfoIconParams & HTMLProps<HTMLDivElement>> = ({ url }) => (
	<Link
		to={url}
		className={`z-[2] flexcenter absolute top-[1rem] left-[1rem] w-[4rem] h-[4rem] rounded-[50%] bg-ctgold ${beforeStyle} ${afterStyle}`}
	></Link>
);
