import Header from '../../components/Header';
import { Box } from '@mui/material';
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
	{
		users {
			id,
			name,
			email		
		}
	}
`;

const Dashboard = () => {
	const {data, loading, error} = useQuery(GET_USERS);

	// if (loading) return "Loading...";
	// if (error) return <pre>{error.message}</pre>


	return (
		<Box m='1.25rem'>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Header title='DASHBOARD' subTitle='Welcome to CryptoKeeping! App where you can keep watch on your finances.' />
			</Box>
		</Box>
	);
}

export default Dashboard;