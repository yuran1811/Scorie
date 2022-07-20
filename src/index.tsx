import App from '@/App';
import { updateSW } from '@/services';
import ErrorBoundary from '@cpns/ErrorBoundary';
import '@styles/index.css';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root') as HTMLElement
);

updateSW();
