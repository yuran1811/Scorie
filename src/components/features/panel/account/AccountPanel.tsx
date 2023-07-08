import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { useStore } from '@/store';
import { SignIn } from '@cpns/features/auth/SignIn';
import SignInUseEmailPassWord from '@cpns/features/auth/SignInUseEmailPassword';
import { BackIcon } from '@cpns/icons';
import { Divider } from '@cpns/shared';
import { FC } from 'react';
import { AccountInfo } from './AccountInfo';

const AccountPanel: FC<DivProps> = ({ className = '' }) => {
  const currentUser = useStore((s) => s.currentUser);

  const { active, setActive } = usePanel();

  return (
    <div
      className={`${
        active.isAccount ? 'translate-y-0' : 'translate-y-[-200%]'
      } isAnimated fullscreen medtab:max-w-[50rem] z-20 bg-vintage1-1/90 px-12 pb-14 pt-28 text-ctbg backdrop-blur-2xl ${className}`}
    >
      <BackIcon className={className} onClick={() => setActive && setActive((s) => ({ ...s, isAccount: false }))} />

      {currentUser ? (
        <AccountInfo />
      ) : (
        <div className="h-4/5 w-full space-y-12 overflow-y-auto overflow-x-hidden">
          <SignInUseEmailPassWord />
          <Divider />
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default AccountPanel;
