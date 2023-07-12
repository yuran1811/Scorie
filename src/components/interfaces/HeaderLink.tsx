import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

const navLinkDefault = 'typo-sm font-semibold text-center text-green-200 tracking-[0.25rem] mx-4 px-2';
const navLinkActive = `${navLinkDefault} relative`;

interface HeaderLinkProps {
  url: string;
}

export const HeaderLink: FC<HeaderLinkProps & PropsWithChildren> = ({ children, url }) => (
  <NavLink to={url} className={({ isActive }) => (isActive ? navLinkActive : navLinkDefault)}>
    {children}
  </NavLink>
);
