import { customStyle } from 'utils';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const { underline } = customStyle;

const navLinkDefault =
	'lg:text-[3.2rem] text-[2.5rem] font-semibold text-center text-green-200 tracking-[0.25rem] mx-4 px-2';
const navLinkActive = `${navLinkDefault} relative ${underline}`;

interface HeaderLinkProps {
	url: string;
}

export const HeaderLink: FC<HeaderLinkProps> = ({ children, url }) => (
	<NavLink to={url} className={({ isActive }) => (isActive ? navLinkActive : navLinkDefault)}>
		{children}
	</NavLink>
);
