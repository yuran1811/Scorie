import { useStore } from '@/store';
import { SignIn } from '@cpns/features/auth/SignIn';
import SignInUseEmailPassWord from '@cpns/features/auth/SignInUseEmailPassword';
import { Divider } from '@cpns/shared';
import { PanelWrapper } from '../PanelWrapper';
import { AccountInfo } from './AccountInfo';
import { GuestInfo } from './GuestInfo';

const AccountPanel = () => {
  const currentUser = useStore((s) => s.currentUser);

  return (
    <PanelWrapper type="isAccount" activeClass="translate-y-0" inactiveClass="translate-y-[-200%]">
      {!currentUser?.displayName && !currentUser?.email && currentUser ? (
        <GuestInfo />
      ) : currentUser ? (
        <AccountInfo />
      ) : (
        <div className="mt-12 h-[calc(100%-4rem)] w-full space-y-8 overflow-y-auto overflow-x-hidden">
          <SignInUseEmailPassWord />
          <Divider />
          <SignIn />
        </div>
      )}
    </PanelWrapper>
  );
};

export default AccountPanel;
