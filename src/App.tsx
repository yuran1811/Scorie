import { useQuotes } from '@/hooks';
import { HomePage } from '@/pages';
import { publicRoutes } from '@/routes';
import { setUserProfile } from '@/services';
import { auth } from '@/shared';
import { useStore } from '@/store';
import TRANSLATIONS from '@/translations';
import { mergeQuoteData } from '@/utils';
import { FlatLoading } from '@cpns/icons';
import MainLayout from '@cpns/layouts/MainLayout';
import { ErrorContent } from '@cpns/shared';
import { onAuthStateChanged } from 'firebase/auth';
import i18next from 'i18next';
import { FC, Suspense, useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { Outlet, Route, Routes } from 'react-router-dom';
// import IconCollection from '@cpns/icons/IconCollection';

i18next.use(initReactI18next).init({
  lng: 'vi',
  fallbackLng: 'en',
  resources: {
    vi: { translation: TRANSLATIONS.vi },
    en: { translation: TRANSLATIONS.en },
  },
});

const App: FC = () => {
  const quotes = useStore((s) => s.quotes);
  const setQuotes = useStore((s) => s.setQuotes);
  const currentUser = useStore((s) => s.currentUser);
  const setCurrentUser = useStore((s) => s.setCurrentUser);

  const { data, error, loading } = useQuotes(quotes.numPage, !quotes.numPage || quotes.isFetch);

  useEffect(() => {
    const unregisterAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCurrentUser(null);
        return;
      }

      setCurrentUser(user);
      setUserProfile(user);
    });

    return () => unregisterAuth();
  }, []);

  useEffect(() => {
    if (error) {
      setQuotes({ ...quotes, isFetch: false, loading: false });
      return;
    }

    const { canUpdate, mergeData } = mergeQuoteData(quotes, data);
    canUpdate && setQuotes(mergeData);
  }, [data, error, loading]);

  return (
    <Suspense fallback={<FlatLoading />}>
      <MainLayout>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage isLoading={currentUser} />} />
            {publicRoutes.map(({ component: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>
          <Route path="*" element={<ErrorContent />} />
        </Routes>
        <Outlet />
        {/* <IconCollection /> */}
      </MainLayout>
    </Suspense>
  );
};

export default App;
