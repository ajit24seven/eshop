import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { AdminNav } from '../_layout';
import { categoryService } from '../_services';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { toasterActions } from '../_actions';

function CategoryPage() {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [categories, setCategories] = useState([]);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);

	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state.authentication }));

	useEffect(() => {
		if (!formSubmitted) {
			loadCategory();
		}
		return () => setFormSubmitted(false);
	}, [formSubmitted]);

	const loadCategory = () => {
		categoryService
			.getCategories()
			.then((res) => {
				setCategories(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				dispatch(toasterActions.error('error is there'));
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		categoryService
			.createCategory(name, user.token)
			.then((res) => {
				setLoading(false);
				resetStates();
				dispatch(toasterActions.success(`${name} Successfully added`));
			})
			.catch((err) => {
				setLoading(false);
				dispatch(toasterActions.error('error is there'));
			});
	};

	const handleRemoveCategory = (e, slug) => {
		e.preventDefault();
		categoryService
			.removeCategory(slug, user.token)
			.then((res) => {
				setLoading(false);
				resetStates();
				dispatch(toasterActions.success(`${name} Successfully added`));
			})
			.catch((err) => {
				setLoading(false);
				dispatch(toasterActions.error('error is there'));
			});
	};

	const updateCategory = (e) => {
		e.preventDefault();
		setIsUpdate(false);
		categoryService
			.updateCategory(slug, name, user.token)
			.then((res) => {
				setLoading(false);
				resetStates();
				dispatch(toasterActions.success(`${name} Successfully added`));
			})
			.catch((err) => {
				setLoading(false);
				dispatch(toasterActions.error('error is there'));
			});
	};

	const resetStates = () => {
		setName('');
		setSlug('');
		setIsUpdate(false);
		setFormSubmitted(true);
	};

	const categoryForm = () => {
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
	};

	const renderRow = (props) => {
		const { index, style } = props;

		return (
			<>
				<ListItem
					style={style}
					key={index}
					component='div'
					disablePadding
					secondaryAction={
						<>
							<IconButton
								edge='end'
								onClick={() => {
									setName(categories[index].name);
									setSlug(categories[index].slug);
									setIsUpdate(true);
								}}
								aria-label='edit'
							>
								<EditIcon />
							</IconButton>
							<IconButton
								sx={{ marginLeft: '15px' }}
								edge='end'
								onClick={(event) =>
									handleRemoveCategory(
										event,
										categories[index].slug
									)
								}
								aria-label='delete'
							>
								<DeleteIcon />
							</IconButton>
						</>
					}
				>
					<ListItemText primary={categories[index].name} />
				</ListItem>
			</>
		);
	};

	return (
		<>
			<Grid item xs={12} md={3}>
				<AdminNav></AdminNav>
			</Grid>
			<Grid item xs={12} md={9}>
				<main>
					<div>
						<Typography variant='h6' noWrap>
							Create Category
						</Typography>
						{categoryForm()}
					</div>
					<div>
						<Box
							sx={{
								width: '100%',
								height: 400,
								clear: 'both',
								bgcolor: 'background.paper',
								marginTop: '30px',
								float: 'left',
							}}
						>
							<FixedSizeList
								height={500}
								itemSize={46}
								itemCount={categories.length}
							>
								{renderRow}
							</FixedSizeList>
						</Box>
					</div>
				</main>
			</Grid>
		</>
	);
}

export default CategoryPage;
