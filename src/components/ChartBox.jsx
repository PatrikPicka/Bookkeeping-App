import {
	Box,
	Typography,
	useTheme
} from "@mui/material";
import { tokens } from "../theme";

const ChartBox = ({icon, value, description, chart}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			backgroundColor={colors.primary[400]}
			p={'1rem'}
			width={'100%'}
		>
			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'start'}
			>
				{icon}
				<Typography variant={'h4'} color={colors.grey[100]}>
					{value}
				</Typography>
				<Typography color={colors.greenAccent[500]} >
					{description}
				</Typography>
			</Box>

			<Box>
				{chart}
			</Box>
		</Box>
	);
};