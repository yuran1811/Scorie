import { auth } from '@/shared';
import { getFirebaseErr } from '@/utils';
import { FacebookIcon, GoogleIcon, UserIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Divider, ModalBox, ModalBoxHeader } from '@cpns/shared';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, signInAnonymously, signInWithPopup } from 'firebase/auth';
import { FC, useState } from 'react';
import { LogInButton } from './LogInButton';

export const SignIn: FC = () => {
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = (provider: AuthProvider) => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
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

  const anonymousSignIn = () => {
    setLoading(true);
    signInAnonymously(auth)
      .then(() => {
        console.log('Sign in as Guest');
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
      <div className="flexcenter mb-16 flex-1 flex-row flex-wrap medmb:flex-col">
        <LogInButton
          provider="GG"
          Icon={GoogleIcon}
          className="bg-slate-900 text-white"
          disabled={loading}
          onClick={() => handleSignIn(new GoogleAuthProvider())}
        />
        <LogInButton
          provider="FB"
          Icon={FacebookIcon}
          className="bg-blue-600 text-white"
          disabled={loading}
          onClick={() => handleSignIn(new FacebookAuthProvider())}
        />
        <Divider className="my-6" />
        <LogInButton
          provider="guest"
          Icon={UserIcon}
          className="bg-white text-black"
          disabled={loading}
          onClick={() => anonymousSignIn()}
        />
      </div>

      {isAlertOpened && (
        <ModalBox onClick={() => setIsAlertOpened(false)}>
          <ModalBoxHeader onClick={() => setIsAlertOpened(false)} />

          <ErrorMessage className="px-8 pb-6" content="cannot sign in" />
          <p className="typo-2sm">Code:</p>
          <ErrorMessage className="px-8 pb-10" content={error} />
        </ModalBox>
      )}
    </>
  );
};
