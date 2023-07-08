import { PanelProvider } from '@/contexts';
import { ExtraTools } from '@cpns/features/extras';
import { Panel } from '@cpns/features/panel';
import { MenuIcon } from '@cpns/icons';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: FC = () => {
  const { pathname } = useLocation();

  return (
    <header className="flexcenter fixed top-0 z-20 h-[--header-height-sm] w-full !justify-between bg-gradient-to-b from-ctbg/20 to-vintage1-5/20 backdrop-blur-2xl backdrop-brightness-50 medmb:h-[--header-height]">
      <PanelProvider>
        <MenuIcon className="z-20 mx-10" />
        <Panel className="z-[19]" />
      </PanelProvider>

      <Link to="/">
        <div
          className="typo-lg text-center font-bold"
          onClick={() =>
            pathname === '/' && document.querySelector('#root > div')?.scroll({ top: 0, left: 0, behavior: 'smooth' })
          }
        >
          Scorie
        </div>
      </Link>

      <ExtraTools />
    </header>
  );
};
