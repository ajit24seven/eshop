import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { toasterActions } from '../_actions';
import { userService } from '../_services';

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('difisec548@cyadp.com');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			await userService.forgotPassword(email);
			dispatch(
				toasterActions.success(
					'Check you email for password reset link'
				)
			);
			setLoading(false);
		} catch (error) {
			dispatch(toasterActions.error(error.message));
			setLoading(false);
			console.log('ERROR MESSAGE IN FORGOT PASSWORD', error);
		}
	};
	return (
		<div className='login'>
			<Grid container justifyContent='center' alignItems='center'>
				<Grid item xs={4}>
					<form noValidate>
						<Typography variant='h6' noWrap>
							Forgot Password
						</Typography>

						<TextField
							fullWidth={true}
							label='Email Address'
							value={email}
							type='email'
							onChange={(e) => setEmail(e.target.value)}
							variant='standard'
							autoFocus
						/>

						<Button
							fullWidth={true}
							variant='contained'
							size='medium'
							color='primary'
							type='submit'
							disabled={loading}
							onClick={handleSubmit}
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
								Submit
							</label>
						</Button>
					</form>
				</Grid>
			</Grid>
		</div>
	);
};

export default ForgotPasswordPage;
