import { AppStatusProvider } from '@/contexts';
import { useStore } from '@/store';
import { AnimateLogo } from '@cpns/features/animations';
import { Footer, Header } from '@cpns/layouts/partials';
import { AppStatusPopup } from '@cpns/shared/AppStatusPopup';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const MainLayout: FC = ({ children }) => {
  const settings = useStore((s) => s.settings);

  return (
    <AppStatusProvider>
      <div className="fullsize relative z-[0] overflow-x-hidden bg-ctbg text-[3rem] text-white">
        <Header />
        <div>
          {settings.showStartUpLogo && <AnimateLogo />}
          {children}
        </div>
        <Footer />
      </div>

      <div className="relative z-[2]" id="modal-container">
        <AppStatusPopup />
      </div>

      <div className="relative z-[3]" id="confirm-container"></div>

      <div className="relative z-[10000]" id="over-tippy-container"></div>

      <ToastContainer theme="dark" newestOnTop />
    </AppStatusProvider>
  );
};

export default MainLayout;
