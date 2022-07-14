import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

export default function CategoryForm({
	handleSubmit,
	setName,
	name,
	isUpdate,
	loading,
	resetStates,
	updateCategory,
}) {
	return (
		<form noValidate>
			<TextField
				fullWidth={true}
				label='Name'
				type='text'
				variant='standard'
				value={name}
				onChange={(e) => setName(e.target.value)}
				autoFocus
			/>

			{!isUpdate && (
				<Button
					variant='contained'
					size='medium'
					color='primary'
					type='submit'
					onClick={handleSubmit}
					sx={{ marginTop: '10px', float: 'right' }}
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
						Save
					</label>
				</Button>
			)}
			{isUpdate && (
				<Button
					variant='contained'
					size='medium'
					color='primary'
					type='submit'
					onClick={updateCategory}
					sx={{ marginTop: '10px', float: 'right' }}
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
						Update
					</label>
				</Button>
			)}
			<Button
				variant='contained'
				size='medium'
				color='secondary'
				type='button'
				onClick={() => resetStates()}
				sx={{
					marginTop: '10px',
					marginRight: '20px',
					float: 'right',
				}}
			>
				<label className='loaderContainer'>Clear</label>
			</Button>
		</form>
	);
}
