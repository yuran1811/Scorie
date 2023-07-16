import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { useStore } from '@/store';
import { Avatar, Overlay } from '@cpns/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import About from './about/About';
import AccountContainer from './account/AccountContainer';
import DataContainer from './data/DataContainer';
import DocContainer from './doc/DocContainer';
import SettingContainer from './setting/SettingContainer';
import { classnames } from '@/utils';

export const Panel: FC<DivProps> = ({ className = '' }) => {
  const settings = useStore((s) => s.settings);
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const { active, setActive } = usePanel();

  return (
    <>
      {active.isMenu && (
        <Overlay
          onClick={() =>
            setActive && setActive({ isMenu: false, isAccount: false, isData: false, isDoc: false, isSetting: false })
          }
        />
      )}

      <div
        className={classnames(
          'isAnimated fullscreen overflow-hidden border-ctcolor px-12 py-20 text-ctcolor medtab:max-w-[48rem] medtab:border-r-2',
          settings.glassmorphismDesign ? 'bg-violet-800/30 backdrop-blur-sm' : 'bg-ctbg',
          active.isMenu ? 'translate-x-0' : 'translate-x-[-200%]',
          className
        )}
      >
        <div className="flexcentercol z-[2] m-auto mb-12 w-full pt-8 lgmb:!flex-row medtab:px-6">
          {currentUser && (
            <Avatar
              className="hidden cursor-pointer lgmb:block"
              imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
              radius="5.5rem"
            />
          )}

          <div className="typo-med mx-6 line-clamp-1 w-max max-w-full p-4 text-center font-bold">
            {currentUser?.displayName ? currentUser.displayName : t('guest')}
          </div>

          {currentUser && (
            <Avatar
              className="cursor-pointer lgmb:hidden"
              imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
              radius="8rem"
            />
          )}
        </div>

        <div
          className={`flexcentercol scrollY z-[1] w-full !justify-start gap-6 space-y-12 pb-24 lgmb:pb-14 ${
            currentUser ? 'h-[calc(100%-15rem)] lgmb:h-[calc(100%-10rem)]' : 'h-[calc(100%-10rem)]'
          }`}
        >
          <About />
          <AccountContainer />
          <DataContainer />
          <SettingContainer />
          <DocContainer />
        </div>
      </div>
    </>
  );
};
