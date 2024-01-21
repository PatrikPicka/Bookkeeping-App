import {
	Box,
	Button,
	FormControl,
	FormGroup,
	IconButton, InputLabel,
	Modal,
	NativeSelect, rgbToHex,
	TextField,
	Typography,
	useTheme
} from "@mui/material";
import { tokens } from "../../../theme";
import { Formik, useFormik } from "formik";
import * as yup from 'yup';
import { CloseOutlined } from "@mui/icons-material";
import { MuiColorInput } from "mui-color-input";

const testCurrencyData = [
	{
		id: 1,
		code: 'czk'
	},
	{
		id: 2,
		code: 'usd'
	}
];

const CreateOrEditAccountModal = ({ open, handleClose, handleSubmit, id, name, balance, currency }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		bgcolor: `${ colors.primary[400] }`,
		color: `${ colors.grey[100] }`,
		border: `2px solid ${ colors.primary[400] }`,
		boxShadow: 24,
	};

	const handleCloseModal = () => {
		handleClose();
	}

	let initialValues = {
		id: '',
		name: '',
		balance: 0,
		currency: testCurrencyData[0].id,
	};

	if (id) {
		initialValues.id = id;
		initialValues.name = name;
		initialValues.balance = balance;
		initialValues.currency = currency;
	}

	console.log(initialValues);

	let formik = useFormik({
		initialValues: initialValues,
	});

	return (
		<Modal
			open={ open }
		>
			<Box
				sx={ style }
			>
				<Box
					display={ 'flex' }
					justifyContent={ 'space-between' }
					alignItems={ 'center' }
					backgroundColor={ colors.primary[500] }
					p={ '1.5rem' }
				>
					<Typography variant={ 'h3' }>{ id !== null ? 'Edit group' : 'Create group' }</Typography>
					<IconButton onClick={ handleCloseModal }>
						<CloseOutlined/>
					</IconButton>
				</Box>

				<Box p={ '1.5rem' }>
					<FormGroup>
						<input type='hidden' name='id' value={ formik.values.id }/>
						<FormControl fullWidth style={ {
							marginBottom: '1.5rem',
						} }>
							<TextField
								id='account_name'
								label='Name'
								variant='outlined'
								name='name'
								value={ formik.values.name }
								onChange={event => formik.setFieldValue('name', event.target.value)}
							/>
						</FormControl>
						<FormControl fullWidth style={ {
							marginBottom: '1.5rem',
						} }>
							<TextField
								id='account_balance'
								label='Balance'
								variant='outlined'
								name='balance'
								value={ formik.values.balance }
								onChange={event => formik.setFieldValue('balance', event.target.value)}
							/>
						</FormControl>
						<FormControl fullWidth style={ {
							marginBottom: '1.5rem',
						} }>
							<InputLabel variant="standard" htmlFor="uncontrolled-native">
								Currency
							</InputLabel>
							<NativeSelect
								defaultValue={ formik.values.currency }
								inputProps={ {
									name: 'currency',
									id: 'group_currency',
								} }
								onChange={
									event => formik.setFieldValue(
										'currency',
										event.target.value
									)
								}
							>
								{testCurrencyData.map(currency => <option value={currency.id} selected={formik.values.currency == currency.id ? 'selected' : ''}>{currency.code.toUpperCase()}</option>)}
							</NativeSelect>
						</FormControl>
					</FormGroup>
				</Box>
			</Box>
		</Modal>
	);
}

export default CreateOrEditAccountModal;