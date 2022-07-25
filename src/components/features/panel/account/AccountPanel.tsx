import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { useStore } from '@/store';
import { SignIn } from '@cpns/features/auth/SignIn';
import SignInUseEmailPassWord from '@cpns/features/auth/SignInUseEmailPassword';
import { BackIcon } from '@cpns/icons';
import { FC } from 'react';
import { AccountInfo } from './AccountInfo';

const AccountPanel: FC<DivProps> = ({ className }) => {
  const currentUser = useStore((s) => s.currentUser);

  const { active, setActive } = usePanel();

  return (
    <div
      className={`${className || ''} ${
        active.isAccount ? 'translate-y-0' : 'translate-y-[-200%]'
      } z-20 isAnimated fullscreen px-12 pt-28 pb-14 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
    >
      <BackIcon
        onClick={() =>
          setActive &&
          setActive((s) => ({
            ...s,
            isAccount: false,
          }))
        }
      />

      {currentUser ? (
        <AccountInfo />
      ) : (
        <div className="w-full h-4/5 overflow-x-hidden overflow-y-auto">
          <SignInUseEmailPassWord />
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default AccountPanel;
