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
      <div className="z-[0] relative fullsize overflow-x-hidden text-[3rem] text-white bg-ctbg">
        <Header />
        <div>
          {settings.showStartUpLogo && <AnimateLogo />}
          {children}
        </div>
        <Footer />
      </div>

      <div className="z-[2] relative" id="modal-container">
        <AppStatusPopup />
      </div>

      <div className="z-[3] relative" id="confirm-container"></div>

      <ToastContainer theme="dark" />
    </AppStatusProvider>
  );
};

export default MainLayout;
