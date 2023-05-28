import { useState } from 'react';
import {
	Sidebar as ProSidebar,
	Menu,
	MenuItem
} from 'react-pro-sidebar';
import {
	Box,
	IconButton,
	Typography,
	useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import {
	DashboardOutlined,
	CurrencyExchangeOutlined,
	ListOutlined,
	CreditCardOutlined,
	CurrencyBitcoinOutlined,
	MenuOutlined,
	PersonOutlined
} from '@mui/icons-material';

const Item = ({title, to, icon, selected, setSelected}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<MenuItem
			active={selected === title}
			onClick={() => setSelected(title)}
			icon={icon}
			component={<Link
				to={to}
				style={{
					color: `${colors.grey[100]}`,
					textDecoration: 'none',
				}}
			/>}
		>
			{title}
		</MenuItem>
	)
}

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState('Dashboard');

	console.log(selected);

	return (
		<Box sx={{
			'& .ps-sidebar-root': {
				borderColor: `${colors.primary[700]}`,
			},
			'& .ps-sidebar-container': {
				background: `${colors.primary[400]}`,
				minHeight: '100vh',
			},
			'& .ps-menu-button': {
				backgroundColor: 'transparent !important',
				padding: '5px 35px 5px 20px !important',
			},
			'& .ps-menu-button:hover, & .ps-menu-button:hover > .ps-menu-label > a': {
				color: '#868dfb !important',
			},
			'& .ps-menu-button.ps-active': {
				color: '#6870fa !important',
			},
			height: '100%',
		}}>
			<ProSidebar collapsed={isCollapsed} >
				<Menu iconShape='square'>
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlined /> : undefined}
						style={{
							margin: '10px 0 20px 0',
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								ml='15px'
							>
								<Typography variant='h1' color={colors.grey[100]} sx={{ fontSize: 16 }}>
									CryptoKeeping
								</Typography>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlined />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{!isCollapsed && (
						<Box mb='2rem'>
							<Box display='flex' justifyContent='center' alignItems='center'>
								<PersonOutlined sx={{ width: '96px', height: '96px', color: `${colors.grey[100]}` }} />
							</Box>
							<Box textAlign='center' mt='0.75rem'>
								<Typography variant='h2' sx={{ color: `${colors.grey[100]}` }}>PickTheBeast</Typography>
							</Box>
							<Typography variant='h6' color={colors.grey[300]} sx={{ ml: '25px' }} >
								That's not you?
								<Link
									to='/logout'
									style={{
										color: `${colors.greenAccent[500]}`,
										textDecoration: 'none',
									}}
								> Logout</Link>
							</Typography>
						</Box>
					)}

					<Box paddingLeft={isCollapsed ? undefined : '10%'} >
						<Item
							title='Dashboard'
							to='/'
							icon={<DashboardOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='Moeny flow'
							to='/money-flow'
							icon={<CurrencyExchangeOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='Incomes and expenses'
							to='/incomes-and-expenses'
							icon={<ListOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='Accounts'
							to='/accounts'
							icon={<CreditCardOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='Cryptocurrency'
							to='/cryptocurrency'
							icon={<CurrencyBitcoinOutlined />}
							selected={selected}
							setSelected={setSelected}
						/>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
}

export default Sidebar;