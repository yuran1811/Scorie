import { useStore } from '@/store';
import { DivProps } from '@/shared';
import { usePanel } from '@/contexts';
import { Avatar, Overlay } from '@cpns/shared';
import DocContainer from './doc/DocContainer';
import DataContainer from './data/DataContainer';
import AccountContainer from './account/AccountContainer';
import SettingContainer from './setting/SettingContainer';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

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
        <div className="flexcenter z-[2] m-auto w-full pt-14 tablet:px-6">
          {currentUser && (
            <Avatar
              className="hidden cursor-pointer mobile:block"
              imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
              radius="7rem"
            />
          )}
          <div className="mx-6 text-center text-[4.5rem] font-bold line-clamp-1 mobile:text-left">
            {currentUser?.displayName ? currentUser.displayName : t('guest')}
          </div>
        </div>

        <div className="flexcentercol scrollY z-[1] mt-24 h-4/5 w-full !justify-start gap-6 space-y-12 pb-24 text-[4rem]">
          <AccountContainer />
          <DataContainer />
          <SettingContainer />
          <DocContainer />
        </div>
      </div>
    </>
  );
};
