import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ErrorBoundary from 'components/ErrorBoundary';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
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

serviceWorkerRegistration.register();
