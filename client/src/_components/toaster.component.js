import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { toasterActions } from '../_actions';

export const Toaster = () => {
	const { toaster } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(toasterActions.clear());
	};

	return (
		<Snackbar
			open={toaster.open}
			onClose={handleClose}
			autoHideDuration={2000}
		>
			<Alert
				variant='filled'
				elevation={3}
				severity={toaster.severity}
				sx={{ width: '100%' }}
			>
				{toaster.message}
			</Alert>
		</Snackbar>
	);
};
