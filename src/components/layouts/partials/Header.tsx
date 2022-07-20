import { PanelProvider } from '@/contexts';
import { ExtraTools } from '@cpns/features/extras';
import { Panel } from '@cpns/features/panel';
import { MenuIcon } from '@cpns/icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => (
  <header className="z-20 flexcenter !justify-between sticky top-0 w-full h-[8rem] bg-ctbg">
    <PanelProvider>
      <MenuIcon className="mx-10 z-20" />
      <Panel className="z-[19]" />
    </PanelProvider>

    <Link to="/">
      <div className="font-bold text-[4rem] mobile:text-[4.6rem] text-center">Scorie</div>
    </Link>

    <ExtraTools />
  </header>
);
