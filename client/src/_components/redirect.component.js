import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { userActions } from '../_actions';
import { useDispatch } from 'react-redux';

function RedirectComponent() {
	const [count, setCount] = useState(5);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => --currentCount);
		}, 1000);

		if (count === 0) {
			dispatch(userActions.logout());
			history.push('/login');
		}

		return () => clearInterval(interval);
	}, [count, dispatch, history]);

	return (
		<div>
			<Typography
				sx={{ textAlign: 'center', marginTop: '100px' }}
				variant='body2'
				color='error'
			>
				Redirecting you in {count} second.
			</Typography>
		</div>
	);
}

export default RedirectComponent;
