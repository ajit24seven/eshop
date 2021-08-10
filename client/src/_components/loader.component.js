import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import { loaderActions } from '../_actions';

export const Loader = () => {
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(loaderActions.hide());
	};

	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={true}
			onClick={handleClose}
		>
			<CircularProgress color='inherit' />
		</Backdrop>
	);
};
