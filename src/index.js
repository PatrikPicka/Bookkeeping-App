import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "react-auth-kit";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<AuthProvider
			authType={ 'cookie' }
			authName={ '_auth' }
			cookieDomain={ window.location.hostname }
			cookieSecure={ process.env.REACT_APP_COOKIE_SECURE }
		>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);