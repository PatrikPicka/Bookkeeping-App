import Header from '../../components/Header';
import { Box } from '@mui/material';


const Dashboard = () => {
	return (
		<Box m='1.25rem'>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Header title='DASHBOARD' subTitle='Welcome to CryptoKeeping! App where you can keep watch on your finances.' />
			</Box>
		</Box>
	);
}

export default Dashboard;