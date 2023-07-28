import { useQuotes } from '@/hooks';
import { HomePage } from '@/pages';
import { publicRoutes } from '@/routes';
import { setUserProfile } from '@/services';
import { TOUR_STEPS, auth, getDirOfStep, tourStyles } from '@/shared';
import { useStore, useTourStore } from '@/store';
import TRANSLATIONS from '@/translations';
import { mergeQuoteData } from '@/utils';
import ErrorBoundary from '@cpns/ErrorBoundary';
import { MainLayout } from '@cpns/layouts';
import { ErrorContent, FullScreenLoading } from '@cpns/shared';
import { TourProvider } from '@reactour/tour';
import dayjs from 'dayjs';
import { onAuthStateChanged } from 'firebase/auth';
import i18next from 'i18next';
import { FC, Suspense, useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import 'dayjs/locale/vi';

dayjs.locale(useStore.getState().locale || 'vi');

i18next.use(initReactI18next).init({
  lng: useStore.getState().locale || 'vi',
  fallbackLng: 'en',
  resources: {
    vi: { translation: TRANSLATIONS.vi },
    en: { translation: TRANSLATIONS.en },
  },
});

const App: FC = () => {
  const setCurrentUser = useStore((s) => s.setCurrentUser);

  const quotes = useStore((s) => s.quotes);
  const setQuotes = useStore((s) => s.setQuotes);
  
  const currentStep = useTourStore((s) => s.currentStep);
  const setCurrentStep = useTourStore((s) => s.setCurrentStep);

  const navigate = useNavigate();

  const {
    data: quoteData,
    error: quoteError,
    loading: quoteLoading,
  } = useQuotes(quotes.numPage, !quotes.numPage || quotes.isFetch);

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
    if (quoteError) {
      setQuotes({ ...quotes, isFetch: false, loading: false });
      return;
    }
    if (!quoteData || quoteLoading) return;

    const { canUpdate, mergeData } = mergeQuoteData(quotes, quoteData);
    canUpdate && setQuotes(mergeData);
  }, [quoteData, quoteError, quoteLoading]);

  return (
    <ErrorBoundary>
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
                <Route index element={<HomePage />} />
                {publicRoutes.map(({ Component: Page, path }) => (
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
    </ErrorBoundary>
  );
};

export default App;
