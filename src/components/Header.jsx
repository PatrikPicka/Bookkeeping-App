import {
	Typography,
	Box,
	useTheme
} from '@mui/material';
import { tokens } from '../theme';

const Header = ({ title, subTitle }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box mb='1.75rem'>
			<Typography
				variant='h2'
				color={colors.grey[100]}
				fontWeight='bold'
				sx={{
					mb: '0.25rem'
				}}
			>
				{title}
			</Typography>
			<Typography
				variant='h5'
				color={colors.greenAccent[400]}
			>
				{subTitle}
			</Typography>
		</Box>
	);
};

export default Header;