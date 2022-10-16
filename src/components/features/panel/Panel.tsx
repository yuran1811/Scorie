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

export const Panel: FC<DivProps> = ({ className }) => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const { active, setActive } = usePanel();

  return (
    <>
      {active.isMenu && (
        <Overlay
          onClick={() =>
            setActive &&
            setActive({
              isMenu: false,
              isAccount: false,
              isData: false,
              isDoc: false,
              isSetting: false,
            })
          }
        />
      )}

      <div
        className={`${className || ''} ${
          active.isMenu ? 'translate-x-0' : 'translate-x-[-200%]'
        } isAnimated fullscreen bg-ctcolor px-12 py-20 text-ctbg tablet:max-w-[50rem]`}
      >
        <div className="flexcentercol z-[2] m-auto mb-12 w-full pt-14 mobile:!flex-row tablet:px-6">
          {currentUser && (
            <Avatar
              className="hidden cursor-pointer mobile:block"
              imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
              radius="7rem"
            />
          )}

          <div className="mx-6 w-max max-w-full text-center text-[4.5rem] font-bold line-clamp-1">
            {currentUser?.displayName ? currentUser.displayName : t('guest')}
          </div>

          {currentUser && (
            <Avatar
              className="cursor-pointer mobile:hidden"
              imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
              radius="12rem"
            />
          )}
        </div>

        <div className="flexcentercol scrollY z-[1] h-3/5 w-full !justify-start gap-6 space-y-12 pb-24 text-[4rem]">
          <AccountContainer />
          <DataContainer />
          <SettingContainer />
          <DocContainer />
        </div>
      </div>
    </>
  );
};
