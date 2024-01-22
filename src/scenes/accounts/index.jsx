import {
	Box,
	Button, hexToRgb, IconButton,
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
import CreateOrEditAccountModal from "./modals/CreateOrEditAccountModal";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useAuthHeader, useAuthUser } from "react-auth-kit";

function DisplayAccounts(editAccount) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [accounts, setAccounts] = useState([]);
	const {loading, error, data} = useQuery(gql`
				query GetUsersAccounts {
					userAccounts {
						edges {
							node {
								id
								name
								balance
								currency {
									id
								}
							}
						}
					}
				}
			`
	);

	if (loading) {
		return <Typography color={colors.greenAccent[500]}>Loading...</Typography>
	} else if (error) {
		return <Typography color={colors.redAccent[500]}>There was an error while fetching data. Please reload the page and try again.</Typography>
	}
console.log('accounts');
	//TODO: Vyřešit proč hází error too many re-renders
	// setAccounts(data.userAccounts.edges.map(edgeData => {
	// 	return edgeData.node
	// }));
console.log(accounts);
	/** Table configuration **/
	let dataGridItemsPerPage = 25;

	const columnsAccounts = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 11,
			renderCell: ({row: { id, name, balance, currency }}) => {
				return (
					<Typography
						color={`${colors.blueAccent[300]}`}
					>
						{name}
						<IconButton aria-label='edit' onClick={editAccount(id, name, balance, currency.id)}>
							<EditOutlined />
						</IconButton>
					</Typography>
				);
			}
		},
		{
			field: 'balance',
			headerName: 'Account balance',
			flex: 1,
			sortable: false,
			filterable: false,
			renderCell: ({row: { balance, currency }}) => {
				return (
					<Typography
						color={balance > 0 ? `${colors.greenAccent[500]}` : `${colors.redAccent[500]}`}
						width="100%"
						textAlign="left"
						paddingRight="4rem"
					>{balance} {currency.name}</Typography>
				);
			}
		},
	];

	return (<Grid
		container
		spacing={2}
		marginTop='1.5rem'
	>
		<Grid xs={12}>
			{accounts.length > 0 ? (
				<Box px={'1.25rem'}>
					<Typography variant={'h3'} color={colors.grey[100]}>
						Your accounts
					</Typography>
					<DataGrid
						sx={{
							mt: '1rem',
						}}
						columns={columnsAccounts}
						rows={accounts}
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
					To display this data you need first to create an Account.
				</Typography>
			)}
		</Grid>
	</Grid>);
}

const Accounts = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	/** Modal configuration **/
	const [openAccountModal, setOpenAccountModal] = useState(false);
	const [accountModalData, setAccountModalData] = useState({
		id: null,
		name: null,
		balance: null,
		currency: null,
	});

	const handleCloseAccountModal = () => {
		setOpenAccountModal(false);
	};
	const createAccount = () => {
		setAccountModalData({
			id: null,
			name: null,
			balance: null,
			currency: null,
		});

		setOpenAccountModal(true);
	};

	const handleSubmitAccountModal = ({id, name, backgroundColor, type}) => {
		if (id === null) {
			// Create new account
			console.log(id);
		} else {
			// Update account
			console.log(id);
		}
	};

	return (
		<Box m='1.25rem'>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Header title='INCOMES AND EXPENSES' subTitle='Here you can add or edit your incomes or expenses and track them by your accounts.' />

				<Box
					display='flex'
					justifyContent='flex-end'
					alignItems='center'
					color={colors.grey[100]}
				>
					<Button
						onClick={createAccount}
						variant='outlined'
						color='tertiary'
					>
						Add new account
					</Button>
					{ openAccountModal === true ? <CreateOrEditAccountModal
						open={openAccountModal}
						handleClose={handleCloseAccountModal}
						handleSubmit={handleSubmitAccountModal}
						id={accountModalData.id}
						name={accountModalData.name}
						balance={accountModalData.balance}
						currency={accountModalData.currency}
					/> : null }
				</Box>
			</Box>

			<DisplayAccounts editAccount={(id, name, balance, currency) => {
				setAccountModalData({
					id: id,
					name: name,
					balance: balance,
					currency: currency,
				});

				setOpenAccountModal(true);
			}}/>
		</Box>
	);
};

export default Accounts;