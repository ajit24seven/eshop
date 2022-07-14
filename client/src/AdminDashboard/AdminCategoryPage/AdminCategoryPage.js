import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { AdminNav } from '../../_layout';
import { categoryService } from '../../_services';
import { useSelector, useDispatch } from 'react-redux';
import { toasterActions, categoryActions } from '../../_actions';
import CategoryList from './AdminCategoryList';
import { Modal, LoadingButton, SelectComponent } from '../../_components';

function AdminCategoryPage() {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [open, setOpen] = React.useState(false);
	const [category, setCategory] = useState('');

	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state.authentication }));
	const categories = useSelector((state) => ({
		...state.categories,
	}));

	useEffect(() => {
		if (!formSubmitted) {
			dispatch(categoryActions.category());
		}
		return () => setFormSubmitted(false);
	}, [formSubmitted, dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const data = {
				name: name,
				parentId: category,
			};
			await categoryService.createCategory(data, user.token);
			setFormSubmitted(true);
			setLoading(false);
			dispatch(toasterActions.success(`Category successfully added`));
			setOpen(false);
		} catch (err) {
			setLoading(false);
			dispatch(toasterActions.error(err.response.data.message));
		}
	};

	const handleRemoveCategory = async (e, slug, parentId) => {
		e.preventDefault();
		try {
			await categoryService.removeCategory(slug, parentId, user.token);
			dispatch(toasterActions.error(`Category successfully deleted`));
			setLoading(false);
			resetStates();
		} catch (err) {
			setLoading(false);
			dispatch(toasterActions.error(err.response.data.message));
		}
	};

	const updateCategory = (e) => {
		e.preventDefault();
		setIsUpdate(false);
		const data = {
			name: name,
			parentId: category,
		};
		categoryService
			.updateCategory(slug, data, user.token)
			.then((res) => {
				setLoading(false);
				resetStates();
				dispatch(
					toasterActions.success(`Category successfully updated`)
				);
				setOpen(false);
			})
			.catch((err) => {
				setLoading(false);
				dispatch(toasterActions.error(err.response.data.message));
			});
	};

	const resetStates = () => {
		setName('');
		setSlug('');
		setIsUpdate(false);
		setFormSubmitted(true);
	};

	const handleSearchChange = (e) => {
		e.preventDefault(0);
		setKeyword(e.target.value.toLowerCase());
	};

	const searched = (c) => c.name.toLowerCase().includes(keyword);

	const handleClickOpen = () => {
		resetStates();
		setCategory('');
		setOpen(true);
	};

	const handleClose = () => {
		resetStates();
	};

	const handleChange = (e) => {
		console.log(e.target.value);
	};

	console.log(categories);
	if (!categories.data.categories) {
		return <div>Loading</div>;
	}

	return (
		<>
			<Typography variant='h6' noWrap>
				Create Category
			</Typography>

			<Button
				sx={{
					float: 'right',
					marginRight: '10px',
				}}
				onClick={handleClickOpen}
			>
				Add Category
			</Button>
			<Modal
				modalTitle={'Add Category'}
				open={open}
				handleClose={handleClose}
				maxWidth={'sm'}
			>
				<TextField
					fullWidth={true}
					label='Name'
					type='text'
					variant='standard'
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoFocus
					sx={{ marginBottom: '15px' }}
				/>
				{categories.data.length !== 0 && (
					<SelectComponent
						handleChange={handleChange}
						list={categories.data.categories}
						label={'Category'}
						setValue={setCategory}
						value={category}
					/>
				)}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'end',
						gap: '5px',
						paddingTop: '10px',
					}}
				>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => {
							resetStates();
							setOpen(false);
						}}
					>
						Cancel
					</Button>

					<LoadingButton
						label={isUpdate ? 'Update' : 'Save'}
						handleClick={isUpdate ? updateCategory : handleSubmit}
						loading={loading}
					/>
				</Box>
			</Modal>
			<TextField
				id='standard-search'
				label='Search field'
				type='search'
				variant='standard'
				fullWidth
				onChange={handleSearchChange}
			/>
			<div>
				{categories.data.length !== 0 && (
					<CategoryList
						categories={categories.data.categories.filter(searched)}
						setSlug={setSlug}
						setIsUpdate={setIsUpdate}
						setName={setName}
						handleRemoveCategory={handleRemoveCategory}
						setOpen={setOpen}
					/>
				)}
			</div>
		</>
	);
}

export default AdminCategoryPage;
