import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingButton = ({ label, loading, handleClick }) => {
	return (
		<Button
			variant='contained'
			size='medium'
			color='primary'
			type='submit'
			onClick={handleClick}
			disabled={loading}
		>
			<label className='loaderContainer'>
				{loading && (
					<CircularProgress
						className='loader'
						color='inherit'
						size={20}
						thickness={4}
					/>
				)}
				{label}
			</label>
		</Button>
	);
};
