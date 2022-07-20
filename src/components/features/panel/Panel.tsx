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
        } isAnimated fullscreen px-12 py-20 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
      >
        <div className="z-[2] flexcenter w-full tablet:px-6 pt-14 m-auto">
          {currentUser && (
            <Avatar
              className="mobile:block hidden cursor-pointer"
              imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
              radius="7rem"
            />
          )}
          <div className="font-bold mx-6 text-[4.5rem] text-center mobile:text-left line-clamp-1">
            {currentUser?.displayName ? currentUser.displayName : t('guest')}
          </div>
        </div>

        <div className="z-[1] flexcentercol !justify-start w-full h-[80%] pb-12 my-4 text-[4rem] scrollY">
          <AccountContainer />
          <DataContainer />
          <SettingContainer />
          <DocContainer />
        </div>
      </div>
    </>
  );
};
