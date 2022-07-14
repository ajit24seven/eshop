import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../_actions';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TabPanel from './tab';

function AdminProductPage() {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state);

	useEffect(() => {
		dispatch(productActions.product());
	}, [dispatch]);

	if (products.data.length === 0) {
		return <div>Loading</div>;
	}

	return (
		<Grid>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='caption table'>
					<caption>A basic table example with a caption</caption>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align='center'>Category</TableCell>
							<TableCell align='center'>Stock</TableCell>
							<TableCell align='right'>Quantity</TableCell>

							<TableCell align='right'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.data.map((row) => (
							<TableRow key={row.title}>
								<TableCell component='th' scope='row'>
									{row.title}
								</TableCell>
								<TableCell align='center'>
									{row.category && row.category.name}
								</TableCell>
								<TableCell align='center'>
									{row.inStock ? (
										<CheckCircleIcon color='success' />
									) : (
										<CancelIcon color='secondary' />
									)}
								</TableCell>
								<TableCell align='right'>
									{row.quantity}
								</TableCell>
								<TableCell align='right'>
									<IconButton
										aria-label='delete'
										size='small'
									>
										<EditIcon fontSize='small' />
									</IconButton>
									<IconButton
										aria-label='delete'
										size='small'
									>
										<DeleteIcon fontSize='small' />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TabPanel />
		</Grid>
	);
}

export default AdminProductPage;
