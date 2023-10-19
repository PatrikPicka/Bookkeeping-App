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


const CreateOrEditGroupModal = ({ open, handleClose, handleSubmit, id, name, backgroundColor, type }) => {
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
		backgroundColor: 'rgb(255, 255, 255)',
		type: 'income',
	};

	if (id) {
		initialValues.id = id;
		initialValues.name = name;
		initialValues.backgroundColor = backgroundColor;
		initialValues.type = type;
	}

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
								id='group_name'
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
							<MuiColorInput
								value={ formik.values.backgroundColor }
								name='backgroundColor'
								onChange={ (val) => formik.setFieldValue('backgroundColor', val) }
							/>
						</FormControl>
						<FormControl fullWidth style={ {
							marginBottom: '1.5rem',
						} }>
							<InputLabel variant="standard" htmlFor="uncontrolled-native">
								Type
							</InputLabel>
							<NativeSelect
								defaultValue={ formik.values.type }
								inputProps={ {
									name: 'type',
									id: 'group_type',
								} }
								onChange={event => formik.setFieldValue('type', event.target.value)}
							>
								<option value={ 'income' }>Income</option>
								<option value={ 'expense' }>Expense</option>
							</NativeSelect>
						</FormControl>
					</FormGroup>
				</Box>

				<Box
					backgroundColor={colors.primary[500]}
					width={ '100%' }
					p={'1rem 1.5rem'}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'end',
					}}
				>
					<Button
						variant="contained"
						color='secondary'
						size='large'
						onClick={() => handleSubmit({
							id: formik.values.id,
							name: formik.values.name,
							backgroundColor: rgbToHex(formik.values.backgroundColor),
							type: formik.values.type,
						})}
					>
						Save
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}

export default CreateOrEditGroupModal;