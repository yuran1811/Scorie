import { useQuotes } from '@/hooks';
import { HomePage } from '@/pages';
import { publicRoutes } from '@/routes';
import { setUserProfile } from '@/services';
import { TOUR_STEPS, auth, getDirOfStep } from '@/shared';
import { useStore, useTourStore } from '@/store';
import TRANSLATIONS from '@/translations';
import { mergeQuoteData } from '@/utils';
import MainLayout from '@cpns/layouts/MainLayout';
import { ErrorContent, FullScreenLoading } from '@cpns/shared';
import { TourProps, TourProvider } from '@reactour/tour';
import { onAuthStateChanged } from 'firebase/auth';
import i18next from 'i18next';
import { FC, Suspense, useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import 'dayjs/locale/vi';

i18next.use(initReactI18next).init({
  lng: useStore.getState().locale || 'vi',
  fallbackLng: 'en',
  resources: {
    vi: { translation: TRANSLATIONS.vi },
    en: { translation: TRANSLATIONS.en },
  },
});

const tourStyles: Pick<TourProps, 'styles'> = {
  styles: {
    close: (base) => ({ ...base, transform: 'scale(1.5)' }),
    badge: (base) => ({ ...base, fontSize: '2rem' }),
  },
};

const App: FC = () => {
  const quotes = useStore((s) => s.quotes);
  const setQuotes = useStore((s) => s.setQuotes);
  const currentUser = useStore((s) => s.currentUser);
  const setCurrentUser = useStore((s) => s.setCurrentUser);
  const currentStep = useTourStore((s) => s.currentStep);
  const setCurrentStep = useTourStore((s) => s.setCurrentStep);

  const navigate = useNavigate();

  const { data, error, loading } = useQuotes(quotes.numPage, !quotes.numPage || quotes.isFetch);

  const setCurStep: any = (step: number) => {
    getDirOfStep(step, navigate);
    setCurrentStep(step);
  };

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

    if (!data || loading) return;

    const { canUpdate, mergeData } = mergeQuoteData(quotes, data);
    canUpdate && setQuotes(mergeData);
  }, [data, error, loading]);

  return (
    <Suspense fallback={<FullScreenLoading />}>
      <TourProvider
        scrollSmooth
        showCloseButton
        showNavigation
        steps={TOUR_STEPS}
        currentStep={currentStep}
        setCurrentStep={setCurStep}
        styles={tourStyles.styles}
      >
        <MainLayout>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage isLoading={currentUser} />} />
              {publicRoutes.map(({ component: Page, path }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense fallback={<FullScreenLoading />}>
                      <Page />
                    </Suspense>
                  }
                />
              ))}
            </Route>
            <Route path="*" element={<ErrorContent />} />
          </Routes>
          <Outlet />
        </MainLayout>
      </TourProvider>
    </Suspense>
  );
};

export default App;
