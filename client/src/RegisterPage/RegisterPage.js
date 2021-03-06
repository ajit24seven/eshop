import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import './register.styles.scss';

const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const { registration } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!email) {
			return;
		}
		dispatch(userActions.register(email));
		setEmail('');
	};

	return (
		<div className='register'>
			<Grid container justifyContent='center' alignItems='center'>
				<Grid item xs={4}>
					<form noValidate onSubmit={handleSubmit}>
						<Typography variant='h6'> Register </Typography>
						<TextField
							fullWidth={true}
							label='Email Address'
							variant='standard'
							value={email}
							type='email'
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							autoComplete='none'
							autoFocus
						/>

						<Button
							fullWidth={true}
							variant='contained'
							size='medium'
							color='primary'
							type='submit'
							onClick={handleSubmit}
							disabled={registration.loading}
						>
							<label className='loaderContainer'>
								{registration.loading && (
									<CircularProgress
										className='loader'
										color='inherit'
										size={20}
										thickness={4}
									/>
								)}
								Signup
							</label>
						</Button>
					</form>
				</Grid>
			</Grid>
		</div>
	);
};

export default RegisterPage;
