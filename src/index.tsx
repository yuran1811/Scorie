import App from './App';
import ErrorBoundary from 'components/ErrorBoundary';
import { register } from './serviceWorkerRegistration';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { render } from 'react-dom';
import { StrictMode } from 'react';
import './styles/index.css';

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

register(toast);
