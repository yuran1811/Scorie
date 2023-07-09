import { AppStatusProvider } from '@/contexts';
import { useStore, useTourStore } from '@/store';
import { AnimateLogo } from '@cpns/features/animations';
import { Footer, Header } from '@cpns/layouts/partials';
import { AppStatusPopup } from '@cpns/shared/AppStatusPopup';
import { useTour } from '@reactour/tour';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const settings = useStore((s) => s.settings);
  const status = useTourStore((s) => s.status);
  const setStatus = useTourStore((s) => s.setStatus);
  const setCurrentStep = useTourStore((s) => s.setCurrentStep);

  const { setIsOpen } = useTour();

  return (
    <AppStatusProvider>
      <div
        className="fullsize after:fullscreen typo relative z-0 overflow-x-hidden text-white after:z-[-1] after:bg-[#00000099] after:backdrop-blur-lg"
        style={{
          background: 'url(/bg.jpg) no-repeat fixed',
          backgroundClip: 'content-box',
          backgroundPosition: 'top left',
          backgroundSize: 'cover',
        }}
      >
        <Header />
        <div className="header-h relative left-0 top-0 w-full" />
        <>
          {children}
          {/* {<PostPreview />} */}
          {settings.showStartUpLogo && <AnimateLogo />}
        </>
        <Footer />
      </div>

      <div className="relative z-[2]" id="modal-container">
        <AppStatusPopup />
      </div>
      <div className="relative z-[3]" id="confirm-container" />
      <div className="relative z-[10000]" id="over-tippy-container" />
      <ToastContainer theme="dark" newestOnTop />

      {false && !status.isRun && (
        <div className="fullscreen flexcenter z-[100] bg-slate-900/90">
          <button
            className="typo-3xl text-center font-bold text-white"
            onClick={() => {
              setStatus({ isRun: true });
              setCurrentStep(0);
              setIsOpen(true);
            }}
          >
            Start guide
          </button>
        </div>
      )}
    </AppStatusProvider>
  );
};

export default MainLayout;
