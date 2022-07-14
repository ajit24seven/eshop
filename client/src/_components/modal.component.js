import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const Modal = ({
	modalTitle,
	children,
	open,
	handleClose,
	maxWidth,
}) => {
	return (
		<Dialog
			open={open}
			fullWidth={'false'}
			maxWidth={maxWidth}
			onClose={handleClose}
		>
			<DialogTitle>{modalTitle}</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};
