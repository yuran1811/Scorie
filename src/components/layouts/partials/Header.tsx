import { PanelProvider } from '@/contexts';
import { useStore } from '@/store';
import { scrollToTop } from '@/utils';
import { ExtraTools } from '@cpns/features/extras';
import { Panel } from '@cpns/features/panel';
import { MenuIcon } from '@cpns/icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  const settings = useStore((s) => s.settings);

  return (
    <header
      className={`flexcenter header-h fixed top-0 z-20 w-full !justify-between ${
        settings.glassmorphismDesign
          ? 'bg-gradient-to-b from-ctbg/20 to-[#355c7d]/20 backdrop-blur-md backdrop-brightness-50'
          : 'bg-[#150731]'
      }`}
    >
      <PanelProvider>
        <MenuIcon className="z-20 mx-10" />
        <Panel className="z-[19]" />
      </PanelProvider>

      <Link to="/">
        <div className="typo-lg text-center font-bold" onClick={() => scrollToTop()}>
          {innerWidth < 280 ? 'S' : 'Scorie'}
          <span className="typo-4sm textGradient !bg-gradient-to-tl !from-gray-600 !to-white px-2 italic">.Beta</span>
        </div>
      </Link>

      <ExtraTools />
    </header>
  );
};
