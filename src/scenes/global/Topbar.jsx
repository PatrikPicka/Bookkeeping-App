import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import { Box, IconButton, useTheme, InputBase } from '@mui/material';
import {
	LightModeOutlined,
	DarkModeOutlined,
	NotificationsOutlined,
	SettingsOutlined,
	PersonOutlined,
	SearchOutlined
} from '@mui/icons-material';

const Topbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	return (
		<Box display='flex' justifyContent='space-between' p={2}>
			<Box display='flex' backgroundColor={colors.primary[400]} borderRadius='3px'>
				<InputBase sx={{ml: 2, flex: 1}} placeholder='Search...' />
				<IconButton type='button' sx={{ p: 1}}>
					<SearchOutlined />
				</IconButton>
			</Box>

			<Box display='flex'>
				<IconButton type='button' onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? (
						<DarkModeOutlined />
					) : (
						<LightModeOutlined />
					)}
				</IconButton>
				<IconButton type='button'>
					<NotificationsOutlined />
				</IconButton>
				<IconButton type='button'>
					<SettingsOutlined />
				</IconButton>
				<IconButton type='button'>
					<PersonOutlined />
				</IconButton>
			</Box>
		</Box>
	);
}

export default Topbar;