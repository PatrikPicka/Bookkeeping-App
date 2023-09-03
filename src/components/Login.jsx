import { Box, Typography, useTheme } from "@mui/material";
import {tokens} from "../theme";
import {Link} from "react-router-dom";

const Login = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box
			width={'50%'}
			minHeight={'200px'}
			backgroundColor={colors.primary[400]}
			position={'fixed'}
			top={'50%'}
			left={'50%'}
			style={{transform: 'translate(-50%, -50%)'}}
		>
			<Typography variant={'h2'} color={colors.grey[100]}>
				Pro přihlášení nebo registraci použijte účet google.
			</Typography>
			<Typography color={colors.grey[100]}>
				Tato aplikace je podmíněna přihlášením pře Google účet.
				Pokud jej nemáte můžete si jej vytvořit zde:
				  <Link
					to={'https://accounts.google.com/'}
					style={{
						color: `${colors.greenAccent[500]}`,
						textDecoration: 'none',
						"&:hover": {
							color: `${colors.greenAccent[200]}`
						}
					}}
				>
					&nbsp;&nbsp;Vytvořit účet google
				</Link>
			</Typography>

			<Box
				mt={5}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				id={'sign_in_button_wrapper'}
			></Box>
		</Box>
	);
}

export default Login;