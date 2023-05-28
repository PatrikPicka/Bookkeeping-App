import {
	Box,
	Button, IconButton,
	Typography,
	useTheme
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {
	EditOutlined,
	DeleteOutlined,
	AddOutlined
} from "@mui/icons-material";
import Header from "../../components/Header";
import {boxAlignments} from "@nivo/core";

const testGridData = [
	{
		id: 1,
		amount: 190,
		group: {
			name: 'Jídlo',
			backgroundColor: '#db4f4a',
		},
		accountName: 'AirBank',
		type: 'expense',
	},
	{
		id: 2,
		amount: 75000,
		group: {
			name: 'Výplata',
			backgroundColor: '#4cceac',
		},
		accountName: 'AirBank',
		type: 'income',
		flex: 1,
	},
];

const IncomesAndExpenses = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
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
		},
		{
			field: 'id',
			headerName: 'Editovat',
			headerAlign: 'right',
			align: 'right',
			marginRight: '1rem',
			flex: 1,
			sortable: false,
			renderCell: ({row: { id }}) => {
				return (
					<IconButton aria-label='edit' onClick={console.log(id)}>
						<EditOutlined />
					</IconButton>
				);
			}
		},
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
						onClick={console.log('create_new_income')}
						variant='outlined'
						color='success'
						sx={{
							marginRight: '0.5rem',
						}}
					>
						Add new income
					</Button>
					<Button
						onClick={console.log('create_new_expense')}
						variant='outlined'
						color='error'
						sx={{
							marginRight: '0.5rem',
						}}
					>
						Add new expense
					</Button>
					<Button
						onClick={console.log('create_new_group')}
						variant='outlined'
						color='tertiary'
					>
						Add new group
					</Button>
				</Box>
			</Box>

			<Box
				marginTop='1.5rem'
			>
				<DataGrid columns={columns} rows={testGridData} />
			</Box>
		</Box>
	);
};

export default IncomesAndExpenses;