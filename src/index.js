import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import GQLClient from "./GraphQL";
import {ApolloProvider} from "@apollo/client";
import {AuthProvider} from "react-auth-kit";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider
				authType={'cookie'}
				authName={'_auth'}
				cookieDomain={window.location.hostname}
				cookieSecure={window.location.protocol === "https:"}
			>
				<ApolloProvider client={GQLClient}>
					<App/>
				</ApolloProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);