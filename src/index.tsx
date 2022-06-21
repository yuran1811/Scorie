import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AuthProvider } from 'contexts';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root') as HTMLElement
);

serviceWorkerRegistration.register();
