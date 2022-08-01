import { PanelProvider } from '@/contexts';
import { ExtraTools } from '@cpns/features/extras';
import { Panel } from '@cpns/features/panel';
import { MenuIcon } from '@cpns/icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => (
  <header className="flexcenter sticky top-0 z-20 h-[8rem] w-full !justify-between bg-ctbg">
    <PanelProvider>
      <MenuIcon className="z-20 mx-10" />
      <Panel className="z-[19]" />
    </PanelProvider>

    <Link to="/">
      <div
        className="text-center text-[4rem] font-bold mobile:text-[4.5rem]"
        onClick={() =>
          document.querySelector('#root > div')?.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
        }
      >
        Scorie
      </div>
    </Link>

    <ExtraTools />
  </header>
);
