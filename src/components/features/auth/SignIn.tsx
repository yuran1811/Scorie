import { auth } from '@/shared';
import { getFirebaseErr } from '@/utils';
import { FacebookIcon, GoogleIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { ModalBox, ModalBoxHeader } from '@cpns/shared';
import { LogInButton } from './LogInButton';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SignIn: FC = () => {
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const handleSignIn = (provider: AuthProvider) => {
    setLoading(true);

    signInWithPopup(auth, provider)
      .then((res) => {
        console.log('Sign in successful');
      })
      .catch((err) => {
        setIsAlertOpened(true);
        setError(getFirebaseErr(err.message));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flexcenter mb-16 flex-1 flex-row flex-wrap gap-4 medmb:flex-col">
        <LogInButton
          className="bg-slate-900 text-white"
          disabled={loading}
          onClick={() => handleSignIn(new GoogleAuthProvider())}
        >
          <GoogleIcon width="35" height="35" />
          <span className="hidden px-4 font-semibold medmb:block">{t('sign in with')} GG</span>
        </LogInButton>

        <LogInButton
          className="bg-blue-600 text-white"
          disabled={loading}
          onClick={() => handleSignIn(new FacebookAuthProvider())}
        >
          <FacebookIcon width="35" height="35" />
          <span className="hidden px-4 font-semibold medmb:block">{t('sign in with')} FB</span>
        </LogInButton>
      </div>

      {isAlertOpened && (
        <ModalBox onClick={() => setIsAlertOpened(false)}>
          <ModalBoxHeader onClick={() => setIsAlertOpened(false)} />

          <ErrorMessage className="px-8 pb-6" content="cannot sign in" />
          <p className="typo-sm">Code:</p>
          <ErrorMessage className="px-8 pb-10" content={error} />
        </ModalBox>
      )}
    </>
  );
};
