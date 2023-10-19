import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Link, useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const login = useSignIn();
	const navigate = useNavigate();
	const isAuthenticated = useIsAuthenticated();

	const handleCallbackResponse = async (response) => {
		const name = jwtDecode(response.credential).given_name;

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
			const jwtData = jwtDecode(response.data.token);

			login({
				token: response.data.token,
				expiresIn: 3600,
				tokenType: "Bearer",
				authState: {
					id: jwtData.id,
					roles: jwtData.roles,
					name: name,
				},
			});

			navigate('/');
		}).catch((error) => {
			console.log(error);
		});
	}

	useEffect(() => {
		if (!isAuthenticated()) {
			while (typeof google === undefined) {
				setTimeout(() => {
				}, 100);
			}

			/* global google*/
			google.accounts.id.initialize({
				client_id: '316073064785-2lu1f3tkvt5gchqqjl1j7p4ngekmosr0.apps.googleusercontent.com',
				callback: handleCallbackResponse,

			});

			google.accounts.id.renderButton(
				document.getElementById("sign_in_button_wrapper"),
				{
					theme: "outline",
					size: "large",
				}
			);
		} else {
			navigate('/');
		}
	}, []);

	return (
		<Box
			width={ '100%' }
			height={ '100%' }
			position={'absolute'}
			top={0}
			left={0}
			sx={{
				backgroundImage: `url("/img/login-background.jpg")`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'left',
				backgroundSize: 'cover',
			}}
		>
			<Box
				width={ '900px' }
				minHeight={ '200px' }
				backgroundColor={ colors.primary['T500'] }
				position={ 'fixed' }
				top={ '50%' }
				left={ '72.5%' }
				padding={'1rem'}
				sx={{
					transform: 'translate(-50%, -50%)',
			}}
			>
				<Typography
					variant={ 'h1' }
					color={ colors.grey[100] }
					style={ {
						textAlign: 'center',
						marginBottom: '0.5rem',
					} }
				>
					Učetnictví kde můžete mít vše!
				</Typography>
				<Typography
					color={ colors.grey[100] }
					style={ {
						textAlign: 'center',
						maxWidth: '550px',
						margin: '0 auto',
					} }
				>
					Tato aplikace je podmíněna přihlášením pře Google účet.
					Pokud jej nemáte můžete si jej vytvořit zde:
					<Link
						to={ 'https://accounts.google.com/' }
						style={ {
							color: `${ colors.greenAccent[500] }`,
							textDecoration: 'none',
							"&:hover": {
								color: `${ colors.greenAccent[200] }`
							}
						} }
					>
						&nbsp;&nbsp;Vytvořit účet google
					</Link>
				</Typography>

				<Box
					mt={ 5 }
					display={ 'flex' }
					justifyContent={ 'center' }
					alignItems={ 'center' }
					id={ 'sign_in_button_wrapper' }
				></Box>
			</Box>
		</Box>
	);
}

export default Login;