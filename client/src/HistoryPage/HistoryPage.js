import React from 'react';
import { UserNav } from '../_layout';
import Grid from '@mui/material/Grid';

const HistoryPage = () => {
	return (
		<>
			<Grid item xs={12} md={3}>
				<UserNav></UserNav>
			</Grid>
			<Grid item xs={12} md={9}>
				<main>ddd</main>
			</Grid>
		</>
	);
};

export default HistoryPage;
