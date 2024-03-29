import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Link, useNavigate } from "react-router-dom";
import { useAuthHeader, useIsAuthenticated, useSignIn } from "react-auth-kit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const login = useSignIn();
	const navigate = useNavigate();
	const isAuthenticated = useIsAuthenticated();
	const [loginError, setLoginError] = useState(false);

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
				expiresIn: 720,
				tokenType: "Bearer",
				authState: {
					id: jwtData.id,
					roles: jwtData.roles,
					name: name,
				},
			});

			navigate('/');
		}).catch((error) => {
			setLoginError(true);
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
					Bookkeeping where you can have everything!
				</Typography>
				<Typography
					color={ colors.grey[100] }
					style={ {
						textAlign: 'center',
						maxWidth: '550px',
						margin: '0 auto',
					} }
				>
					To use this app you need to be logged in by Google account.
					If you do not have any, you can create it here:
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
						&nbsp;&nbsp;Create Google account
					</Link>
				</Typography>

				<Box
					mt={ 5 }
					display={ 'flex' }
					justifyContent={ 'center' }
					alignItems={ 'center' }
					id={ 'sign_in_button_wrapper' }
				></Box>
				{ loginError === true ? <Typography
					color={ colors.redAccent[500] }
					style={ {
						textAlign: 'center',
						maxWidth: '550px',
						margin: '0.5rem auto',
					} }
				>
					There was an error while logging you in. PLease try again later.
				</Typography> : null }
			</Box>
		</Box>
	);
}

export default Login;