import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { useStore } from '@/store';
import { Avatar, Overlay } from '@cpns/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import AccountContainer from './account/AccountContainer';
import DataContainer from './data/DataContainer';
import DocContainer from './doc/DocContainer';
import SettingContainer from './setting/SettingContainer';

export const Panel: FC<DivProps> = ({ className = '' }) => {
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
        className={`isAnimated fullscreen overflow-hidden border-r-2 border-ctcolor bg-ctbg/60 px-12 py-20 text-ctcolor medtab:max-w-[50rem] ${
          active.isMenu ? 'translate-x-0' : 'translate-x-[-200%]'
        } ${className}`}
      >
        <div className="flexcentercol z-[2] m-auto mb-20 w-full pt-14 lgmb:!flex-row medtab:px-6">
          {currentUser && (
            <Avatar
              className="hidden cursor-pointer lgmb:block"
              imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
              radius="6rem"
            />
          )}

          <div className="typo-xl mx-6 line-clamp-1 w-max max-w-full p-4 text-center font-bold">
            {currentUser?.displayName ? currentUser.displayName : t('guest')}
          </div>

          {currentUser && (
            <Avatar
              className="cursor-pointer lgmb:hidden"
              imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
              radius="9rem"
            />
          )}
        </div>

        <div className="flexcentercol typo-2xl scrollY z-[1] h-3/5 w-full !justify-start gap-6 space-y-12 pb-24 lgmb:h-4/5 lgmb:pb-14">
          <AccountContainer />
          <DataContainer />
          <SettingContainer />
          <DocContainer />
        </div>
      </div>
    </>
  );
};
