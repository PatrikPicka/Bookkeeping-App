import React from 'react';
import { useEffect } from 'react';
import jwtDecode from "jwt-decode";
import { ColorModeContext, useMode } from './theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from "react-auth-kit";
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

	const handleCallbackResponse = async (response) => {
		await axios.post(
			process.env.REACT_APP_API_URL + 'login',
			{
				token: response.credential,
			},
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'x-api-secret': process.env.REACT_APP_X_API_SECRET,
				},
			}
		).then((response) => {
			console.log(jwtDecode(response.data.token));
		}).catch((error) => {
			console.log(error);
		});
	}

	useEffect(() => {
		while (typeof google === undefined) {
			setTimeout(() => {}, 100);
		}

		/* global google*/
		google.accounts.id.initialize({
			client_id: '316073064785-2lu1f3tkvt5gchqqjl1j7p4ngekmosr0.apps.googleusercontent.com',
			callback: handleCallbackResponse
		});

		google.accounts.id.renderButton(
			document.getElementById("sign_in_button_wrapper"),
			{
				theme: "outline",
				size: "large",
			}
		);
	}, []);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className='app'>
						<Box display='flex'>
							<Sidebar />
							<main className='content' style={{ width: '100%', }}>
								<Topbar />
								<Routes >
									<Route path='/login' element={<Login />} />
									<Route path='/' element={<Dashboard />} />
									<Route path='/money-flow' element={<MoneyFlow />} />
									<Route path='/incomes-and-expenses' element={<IncomesAndExpenses />} />
								</Routes>
							</main>
						</Box>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;