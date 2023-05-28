import Header from '../../components/Header';
import { Box } from '@mui/material';


const MoneyFlow = () => {
	return (
		<Box m='1.25rem'>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Header title='MONEY FLOW' subTitle='Here you can check your money flow.' />
			</Box>
		</Box>
	);
}

export default MoneyFlow;