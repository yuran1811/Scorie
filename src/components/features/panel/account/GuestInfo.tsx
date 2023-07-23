import { auth } from '@/shared';
import { LogInButton } from '@cpns/features/auth/LogInButton';
import { GoogleIcon } from '@cpns/icons';
import { Button, Divider } from '@cpns/shared';
import { GoogleAuthProvider, linkWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const GuestInfo = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const linkToGGAccount = async () => {
    if (!auth.currentUser) return;

    const ggProvider = new GoogleAuthProvider();

    setLoading(true);

    try {
      const userCre = await linkWithPopup(auth.currentUser, ggProvider);
      GoogleAuthProvider.credentialFromResult(userCre);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flexcentercol scrollY typo-sm mt-12 h-[calc(100%-4rem)] !justify-start px-3">
      <p className="indent-12">{t('all the data will be deleted after 3 days when signing in as guest')}</p>
      <p className="indent-12">{t('to keep the data with your new account, click the button below')}</p>

      <LogInButton
        provider="GG"
        Icon={GoogleIcon}
        className="mt-10 bg-slate-900 text-white"
        disabled={loading}
        onClick={() => linkToGGAccount()}
      />
      <Divider className="my-10" />
      <Button
        className="itypo-2sm"
        before={false}
        content="Log out"
        onClick={() => {
          signOut(auth);
        }}
      />
    </div>
  );
};
