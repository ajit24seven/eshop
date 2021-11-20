import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { AdminNav } from '../_layout';

function AdminDashboard() {
	return (
		<>
			<Grid item xs={12} md={3}>
				<AdminNav></AdminNav>
			</Grid>
			<Grid item xs={12} md={9}>
				<main>ddd</main>
			</Grid>
		</>
	);
}

export default AdminDashboard;
