import React from 'react';
import {ColorModeContext, useMode} from './theme';
import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import {Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import MoneyFlow from './scenes/money-flow';
import IncomesAndExpenses from './scenes/incomes-and-expenses';
// import AccountsDashboard from './scenes/accounts';
// import CryptocurrencyDashboard from './scenes/cryptocurrency-dashboard';

const App = () => {
	const [theme, colorMode] = useMode();

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