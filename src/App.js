import React, { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import { ColorModeContext, useMode } from './theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RequireAuth, useSignIn, useIsAuthenticated } from "react-auth-kit";
import axios from "axios";

import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import MoneyFlow from './scenes/money-flow';
import IncomesAndExpenses from './scenes/incomes-and-expenses';
import Login from "./components/Login";

// import AccountsDashboard from './scenes/accounts';
// import CryptocurrencyDashboard from './scenes/cryptocurrency-dashboard';

const App = () => {
	const [theme, colorMode] = useMode();
	const isAuthenticated = useIsAuthenticated();

	const PrivateRoute = ({ Component }) => {
		return isAuthenticated() ? Component : <Navigate to="/login" />;
	};

	return (
		<ColorModeContext.Provider value={ colorMode }>
			<ThemeProvider theme={ theme }>
				<CssBaseline/>
				<div className='app'>
					<Box display='flex'>
						{ isAuthenticated() === true ? <Sidebar/> : <></> }
						<main className='content' style={ { width: '100%', } }>
							{ isAuthenticated() === true ? <Topbar/> : <></> }
							<Routes>
								<Route path='/login' element={ <Login/> }/>
								<Route path='/'
									   element={ <PrivateRoute Component={<Dashboard/>} /> }/>
								<Route path='/money-flow'
									   element={ <PrivateRoute Component={ <MoneyFlow/> } /> }/>
								<Route path='/incomes-and-expenses' element={ <PrivateRoute Component={ <IncomesAndExpenses/> } /> }/>
							</Routes>
						</main>
					</Box>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;