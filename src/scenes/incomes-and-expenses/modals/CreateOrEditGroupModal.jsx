import {Box, Button, IconButton, Modal, TextField, Typography, useTheme} from "@mui/material";
import { tokens } from "../../../theme";
import { Formik } from "formik";
import * as yup from 'yup';
import {CloseOutlined} from "@mui/icons-material";



const CreateOrEditGroupModal = ({open, handleClose}, id, name, backgroundColor) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		bgcolor: `${colors.primary[400]}`,
		color: `${colors.grey[100]}`,
		border: `2px solid ${colors.primary[400]}`,
		boxShadow: 24,
	};

	const handleCloseModal = () => {
		console.log(handleClose);
		handleClose();
	}

	const initialValues = {
		name: '',
		backgroundColor: '',
	};

	if (id) {
		initialValues.name = name;
		initialValues.backgroundColor = backgroundColor;
	}

	return (
		<Modal
			open={open}
		>
			<Box
				sx={style}
			>
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					alignItems={'center'}
					backgroundColor={colors.primary[500]}
					p={'1.5rem'}
				>
					<Typography variant={'h3'}>{id ? 'Upravit skupinu' : 'Vytvořit skupinu'}</Typography>
					<IconButton onClick={handleCloseModal}>
						<CloseOutlined />
					</IconButton>
				</Box>
			</Box>
		</Modal>
	);
}

export default CreateOrEditGroupModal;