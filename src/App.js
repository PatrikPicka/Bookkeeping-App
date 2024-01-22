import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";

import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import MoneyFlow from './scenes/money-flow';
import IncomesAndExpenses from './scenes/incomes-and-expenses';
import Accounts from './scenes/accounts';
import Login from "./components/Login";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// import AccountsDashboard from './scenes/accounts';
// import CryptocurrencyDashboard from './scenes/cryptocurrency-dashboard';

const App = () => {
	const [theme, colorMode] = useMode();
	const isAuthenticated = useIsAuthenticated();

	const PrivateRoute = ({ Component }) => {
		return isAuthenticated() ? Component : <Navigate to="/login"/>;
	};

	const authHeader = useAuthHeader();

	const GQLClient = new ApolloClient({
		uri: process.env.REACT_APP_API_URL + "graphql",
		cache: new InMemoryCache(),
		headers: {
			Authentication: authHeader(),
			'x-api-secret': process.env.REACT_APP_X_API_SECRET,
		}
	});

	return (
		<ColorModeContext.Provider value={ colorMode }>
			<ThemeProvider theme={ theme }>
				<CssBaseline/>
				<ApolloProvider client={ GQLClient }>
					<div className='app'>
						<Box display='flex'>
							{ isAuthenticated() === true ? <Sidebar/> : <></> }
							<main className='content' style={ { width: '100%', } }>
								{ isAuthenticated() === true ? <Topbar/> : <></> }
								<Routes>
									<Route path='/login' element={ <Login/> }/>
									<Route path='/'
										   element={ <PrivateRoute Component={ <Dashboard/> }/> }/>
									<Route path='/money-flow'
										   element={ <PrivateRoute Component={ <MoneyFlow/> }/> }/>
									<Route path='/incomes-and-expenses'
										   element={ <PrivateRoute Component={ <IncomesAndExpenses/> }/> }/>
									<Route path='/accounts'
										   element={ <PrivateRoute Component={ <Accounts/> }/> }/>
								</Routes>
							</main>
						</Box>
					</div>
				</ApolloProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;