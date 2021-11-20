import React from 'react';
import { UserNav } from '../_layout';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
