import { AppStatusProvider } from '@/contexts';
import { useStore, useTourStore } from '@/store';
import { AnimateLogo } from '@cpns/features/animations';
import { Footer, Header } from '@cpns/layouts/partials';
import { AppStatusPopup } from '@cpns/shared/AppStatusPopup';
import { useTour } from '@reactour/tour';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const MainLayout: FC = ({ children }) => {
  const settings = useStore((s) => s.settings);
  const status = useTourStore((s) => s.status);
  const setStatus = useTourStore((s) => s.setStatus);
  const setCurrentStep = useTourStore((s) => s.setCurrentStep);

  const { setIsOpen } = useTour();

  return (
    <AppStatusProvider>
      <div className="fullsize relative z-[0] overflow-x-hidden bg-ctbg text-[3rem] text-white">
        <Header />
        <>
          {settings.showStartUpLogo && <AnimateLogo />}
          {children}
          {/* {<PostPreview />} */}
        </>
        <Footer />
      </div>

      <div className="relative z-[2]" id="modal-container">
        <AppStatusPopup />
      </div>

      <div className="relative z-[3]" id="confirm-container"></div>

      <div className="relative z-[10000]" id="over-tippy-container"></div>

      {false && !status.isRun && (
        <div className="fullscreen flexcenter z-[100] bg-slate-900/90">
          <button
            className="text-center text-[5rem] font-bold text-white"
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

      <ToastContainer theme="dark" newestOnTop />
    </AppStatusProvider>
  );
};

export default MainLayout;
