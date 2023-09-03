import {
	Box,
	Button, IconButton,
	Typography,
	useTheme
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {DataGrid, GridRow} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {
	EditOutlined,
	DeleteOutlined,
	AddOutlined
} from "@mui/icons-material";
import Header from "../../components/Header";
import CreateOrEditGroupModal from "./modals/CreateOrEditGroupModal";
import {useState} from "react";

const testGroupsData = [
	{
		id: 1,
		name: 'Jídlo',
		backgroundColor: '#db4f4a'
	},
	{
		id: 2,
		name: 'Výplata',
		backgroundColor: '#4cceac'
	}
];

const testIncomesAndExpensesData = [
	{
		id: 1,
		amount: 190,
		date: '25.5.2023',
		group: testGroupsData[0],
		accountName: 'AirBank',
		type: 'expense',
	},
	{
		id: 2,
		amount: 75000,
		date: '15.5.2023',
		group: testGroupsData[1],
		accountName: 'AirBank',
		type: 'income',
		flex: 1,
	},
];

const IncomesAndExpenses = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);

	const handleCloseCreateGroupModal = () => {
		setOpenCreateGroupModal(false);
	}

	const editGroup = (id) => {
		console.log(id);
	}

	const editIncomeOrExpense = (id) => {
		console.log(id);
	}

	let dataGridItemsPerPage = 25;

	const columnsIncomesAndExpenses = [
		{
			field: 'amount',
			headerName: 'Částka',
			flex: 1,
			renderCell: ({row: { amount, type }}) => {
				return (
					<Typography
						color={type === 'income' ? `${colors.greenAccent[500]}` : `${colors.redAccent[500]}`}
					>{type === 'income' ? amount : '-' + amount}</Typography>
				);
			}
		},
		{
			field: 'group',
			headerName: 'Skupina',
			headerAlign: 'left',
			flex: 1,
			sortable: false,
			filterable: false,
			renderCell: ({row: { group }}) => {
				return (
					<Box
						p='0.5rem 1rem'
						display='flex'
						justifyContent='center'
						backgroundColor={group.backgroundColor}
						borderRadius='0.5rem'
					>
						{group.name}
					</Box>
				);
			}
		},
		{
			field: 'accountName',
			headerName: 'Účet',
			flex: 1,
		},
		{
			field: 'date',
			headerName: 'Datum',
			flex: 1,
		},
		{
			field: 'id',
			headerName: 'Editovat',
			headerAlign: 'right',
			align: 'right',
			mr: '1rem',
			flex: 1,
			sortable: false,
			renderCell: ({row: { id }}) => {
				return (
					<IconButton aria-label='edit' onClick={() => {editIncomeOrExpense(id)}}>
						<EditOutlined />
					</IconButton>
				);
			}
		},
	];

	const columnsGroups = [
		{
			field: 'name',
			headerName: 'Jméno skupiny',
			flex: 1,
		},
		{
			field: 'backgroundColor',
			headerName: 'Barva',
			flex: 1,
			renderCell: ({row: {backgroundColor}}) => {
				return (
					<Box
						p='0.5rem 1rem'
						display='flex'
						justifyContent='center'
						backgroundColor={backgroundColor}
						borderRadius='0.5rem'
					>
						{backgroundColor}
					</Box>
				);
			}
		},
		{
			field: 'id',
			headerName: 'Editovat',
			headerAlign: 'right',
			align: 'right',
			mr: '1rem',
			flex: 1,
			sortable: false,
			renderCell: ({row: { id }}) => {
				return (
					<IconButton aria-label='Edit group'  onClick={() => {editGroup(id)}}>
						<EditOutlined />
					</IconButton>
				);
			}
		}
	];

	return (
		<Box m='1.25rem'>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Header title='INCOMES AND EXPENSES' subTitle='Here you can add or edit your incomes or expenses and track them by your groups.' />

				<Box
					display='flex'
					justifyContent='flex-end'
					alignItems='center'
					color={colors.grey[100]}
				>
					<Button
						onClick={() => {console.log('create_new_income')}}
						variant='outlined'
						color='success'
						sx={{
							marginRight: '0.5rem',
						}}
					>
						Add new income
					</Button>
					<Button
						onClick={() => {console.log('create_new_expense')}}
						variant='outlined'
						color='error'
						sx={{
							marginRight: '0.5rem',
						}}
					>
						Add new expense
					</Button>
					<Button
						onClick={() => {setOpenCreateGroupModal(true)}}
						variant='outlined'
						color='tertiary'
					>
						Add new group
					</Button>
					<CreateOrEditGroupModal
						open={openCreateGroupModal}
						handleClose={handleCloseCreateGroupModal}
						id={null}
						name={null}
						backgroundColor={null}
					/>
				</Box>
			</Box>

			<Grid
				container
				spacing={2}
				marginTop='1.5rem'
			>
				<Grid xs={8}>
				{testIncomesAndExpensesData.length > 0 ? (
					<Box px={'1.25rem'}>
						<Typography variant={'h3'} color={colors.grey[100]}>
							Vyýpis výdajů a příjmů
						</Typography>
						<DataGrid
							sx={{
								mt: '1rem',
							}}
							columns={columnsIncomesAndExpenses}
							rows={testIncomesAndExpensesData}
							initialState={{
								pagination: {
									paginationModel: {
										pageSize: dataGridItemsPerPage,
									},
								},
							}}
							disableRowSelectionOnClick={true}
						/>
					</Box>
				) : (
					<Typography variant='h6' color={colors.grey[300]} textAlign='center' >
						Pro zobrazení dat musíte nejdříve nejdřív zadat nějaké příjmy/výdaje.
					</Typography>
				)}
				</Grid>
				<Grid xs={4} >
					{testGroupsData.length > 0 ? (
						<Box >
							<Typography variant={'h3'} color={colors.grey[100]}>
								Výpis skupin příjmů a výdajů
							</Typography>
							<DataGrid
								sx={{
									mt: '1rem',
								}}
								columns={columnsGroups}
								rows={testGroupsData}
								initialState={{
									pagination: {
										paginationModel: {
											pageSize: dataGridItemsPerPage,
										},
									},
								}}
								disableRowSelectionOnClick={true}
							/>
						</Box>
					) : (
						<Typography variant='h6' color={colors.grey[300]} textAlign='center' >
							Pro zobrazení a vytvoření příjmu/výdaje musíte nejprve vytvořit skupinu.
						</Typography>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default IncomesAndExpenses;