import React, { useState, useEffect, useReducer } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Portlet from './Portlet';
import Button from '@mui/material/Button';
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import { categoryService } from '../../_services';
import { useSelector, useDispatch } from 'react-redux';
import { toasterActions, categoryActions } from '../../_actions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IconExpansionTreeView } from '../../_components';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const top100Films = [{ title: 'ajit' }];

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function AdminAddProduct() {
	const [value, setValue] = React.useState(0);
	const [age, setAge] = React.useState('');
	const [aValue, setAValue] = React.useState('');

	/**
	 * Reducer which will perform form state update
	 */
	const formsReducer = (state, action) => {
		switch (action.type) {
			case 'GENERAL':
				return {
					...state,
					general: {
						...state.general,
						[action.name]: action.payload,
					},
				};
			case 'PRICE':
				return {
					...state,
					price: {
						...state.price,
						[action.name]: action.payload,
					},
				};
			case 'INVENTORY':
				return {
					...state,
					inventory: {
						...state.inventory,
						[action.name]: action.payload,
					},
				};
			case 'SHIPPING':
				return {
					...state,
					shipping: {
						...state.shipping,
						[action.name]: action.payload,
					},
				};
			case 'OPTIONS':
				return {
					...state,
					options: {
						...state.options,
						[action.name]: action.payload,
					},
				};
			case 'VARIANTS':
				return {
					...state,
					variants: {
						...state.variants,
						[action.field]: action.payload,
					},
				};
			case 'CATEGORIES':
				return {
					...state,
					categories: {
						...state.categories,
						[action.name]: action.payload,
					},
				};
			case 'TAGS':
				return {
					...state,
					tags: {
						...state.tags,
						[action.name]: action.payload,
					},
				};
			case 'MEDIA':
				return {
					...state,
					media: {
						...state.media,
						[action.name]: action.payload,
					},
				};
			default:
				return state;
		}
	};

	const initialState = {
		general: {
			title: '',
			description: '',
			shortDescription: '',
		},
		price: {
			regularPrice: '',
			salesPrice: '',
			salesFromDate: '',
			salesToDate: '',
		},
		inventory: {
			sku: '',
			stockQuantity: '',
			stockStatus: '',
			lowStockThreshold: '',
		},
		shipping: {
			weight: '',
			length: '',
			width: '',
			Height: '',
		},
		options: [{ name: '', value: [] }],
		variants: {},
		categories: [],
		publish: '',
		tags: [],
		media: [],
	};

	const [formState, dispatchFormValue] = useReducer(
		formsReducer,
		initialState
	);

	const inputChange = (e) => {
		let name = '';
		let value = '';
		let dataType = '';

		if (e.target) {
			e.preventDefault();
			name = e.target.name;
			value = e.target.value;
			dataType = e.target.getAttribute('data-type');
		} else {
			name = e.name;
			value = e.value;
			dataType = e['data-type'];
		}

		dataType = dataType.toUpperCase();
		dispatchFormValue({ type: dataType, name: name, payload: value });
	};

	const handleFormSubmit = (event) => {
		let name = '';
		let value = '';

		if (event.target) {
			event.preventDefault();
			name = event.target.name;
			value = event.target.value;
		} else {
			name = event.name;
			value = event.value;
		}

		//setForm({ ...form, [name]: value });
	};

	const handleStockChange = (event) => {
		setAge(event.target.value);
	};
	const dispatch = useDispatch();

	const categories = useSelector((state) => ({
		...state.categories,
	}));

	useEffect(() => {
		dispatch(categoryActions.category());
	}, [dispatch]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleAutoComplete = (event) => {
		setAValue(event.target.value);
	};

	const handleAutoCompleteBlur = (event) => {
		const value = top100Films.filter((item) => item.title === aValue);
		if (value.length === 0) {
			top100Films.push({ title: aValue });
		}
	};

	if (!categories.data.categoryList) {
		return <div>Loading</div>;
	}

	return (
		<>
			<Typography variant='h5' component='h5' sx={{ mb: 1, mt: 1 }}>
				Add Product
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<form>
					<Grid container spacing={2}>
						<Grid item xs={9}>
							<Portlet title={'General'} sx={{ mb: 2 }}>
								<Grid container>
									<Grid item xs={12} sx={{ p: 2 }}>
										<TextField
											fullWidth={true}
											label='Title'
											type='text'
											variant='standard'
											autoFocus
											name='title'
											inputProps={{
												'data-type': 'General',
											}}
											value={formState.general.title}
											onChange={inputChange}
										/>
									</Grid>

									<Grid item xs={12} sx={{ p: 2 }}>
										<Typography
											paragraph
											sx={{ mb: 0.5, color: '#666' }}
										>
											Description
										</Typography>
										<TextField
											fullWidth={true}
											id='outlined-multiline-static'
											multiline
											rows={4}
											name='description'
											inputProps={{
												'data-type': 'General',
											}}
											value={
												formState.general.description
											}
											onChange={inputChange}
											sx={{ mb: 2 }}
										/>
										<Typography
											paragraph
											sx={{ mb: 0.5, color: '#666' }}
										>
											Short Description
										</Typography>
										<TextField
											fullWidth={true}
											id='outlined-multiline-static'
											multiline
											inputProps={{
												'data-type': 'General',
											}}
											rows={2}
											name='shortDescription'
											value={
												formState.general
													.shortDescription
											}
											onChange={inputChange}
										/>
									</Grid>
								</Grid>
							</Portlet>

							<Portlet title={'Price'} sx={{ mb: 2 }}>
								<Grid container>
									<Grid item xs={6} sx={{ p: 2 }}>
										<TextField
											fullWidth={true}
											label='Regular price'
											type='text'
											variant='standard'
											name='regularPrice'
											value={
												formState.general.regularPrice
											}
											inputProps={{
												'data-type': 'Price',
											}}
											onChange={inputChange}
										/>
									</Grid>
									<Grid item xs={6} sx={{ p: 2 }}>
										<TextField
											fullWidth={true}
											label='Sale price'
											type='text'
											variant='standard'
											name='salesPrice'
											value={formState.general.salesPrice}
											inputProps={{
												'data-type': 'Price',
											}}
											onChange={inputChange}
										/>
									</Grid>
								</Grid>
								<Grid container>
									<Grid item xs={12} sx={{ p: 2 }}>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<Grid container xs={6} spacing={2}>
												<Grid item xs={6}>
													<DatePicker
														label='Sale price dates from'
														value={
															formState.price
																.salesFromDate
														}
														onChange={(
															newValue
														) => {
															inputChange({
																value: newValue,
																name: 'salesFromDate',
																'data-type':
																	'Price',
															});
														}}
														renderInput={(
															params
														) => (
															<TextField
																{...params}
															/>
														)}
													/>
												</Grid>

												<Grid item xs={6}>
													<DatePicker
														label='Sale price dates to'
														value={
															formState.price
																.salesToDate
														}
														onChange={(
															newValue
														) => {
															inputChange({
																value: newValue,
																name: 'salesToDate',
																'data-type':
																	'Price',
															});
														}}
														renderInput={(
															params
														) => (
															<TextField
																{...params}
															/>
														)}
													/>
												</Grid>
											</Grid>
										</LocalizationProvider>
									</Grid>
								</Grid>
							</Portlet>

							<Portlet title={'Inventory'} sx={{ mb: 2 }}>
								<Grid container>
									<Grid item xs={6} sx={{ p: 2 }}>
										<TextField
											fullWidth={true}
											label='SKU'
											type='text'
											variant='standard'
											name='sku'
											value={formState.inventory.sku}
											inputProps={{
												'data-type': 'Inventory',
											}}
											onChange={inputChange}
										/>
									</Grid>
									<Grid item xs={6} sx={{ p: 2 }}>
										<TextField
											fullWidth={true}
											label='Stock quantity'
											type='number'
											variant='standard'
											InputProps={{
												inputProps: {
													min: 0,
												},
											}}
											name='stockQuantity'
											value={
												formState.inventory
													.stockQuantity
											}
											inputProps={{
												'data-type': 'Inventory',
											}}
											onChange={inputChange}
										/>
									</Grid>
								</Grid>
								<Grid container>
									<Grid item xs={6} sx={{ p: 2 }}>
										<FormControl
											fullWidth={true}
											variant='standard'
											sx={{ minWidth: 120 }}
										>
											<InputLabel id='demo-simple-select-standard-label'>
												Stock status
											</InputLabel>
											<Select
												labelId='demo-simple-select-standard-label'
												id='demo-simple-select-standard'
												value={age}
												onChange={handleStockChange}
												label='Stock status'
											>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={10}>
													In Stock
												</MenuItem>
												<MenuItem value={20}>
													Out of Stock
												</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={6} sx={{ p: 2 }}>
										<TextField
											fullWidth={true}
											label='Low stock threshold'
											type='number'
											variant='standard'
											InputProps={{
												inputProps: {
													min: 0,
												},
											}}
											name='lowStockThreshold'
											value={
												formState.inventory
													.lowStockThreshold
											}
											inputProps={{
												'data-type': 'Inventory',
											}}
											onChange={inputChange}
										/>
									</Grid>
								</Grid>
							</Portlet>

							<Portlet title={'Shipping'} sx={{ mb: 2 }}>
								<Grid container xs={12}>
									<Grid item xs={6} sx={{ p: 2 }}>
										<TextField
											fullWidth={true}
											label='Weight (kg)'
											type='number'
											variant='standard'
											InputProps={{
												inputProps: {
													min: 0,
												},
												'data-type': 'Shipping',
											}}
											name='weight'
											value={formState.shipping.weight}
											inputProps={{
												'data-type': 'Shipping',
											}}
											onChange={inputChange}
										/>
									</Grid>
									<Grid container xs={6}>
										<Grid item xs={4} sx={{ p: 2 }}>
											<TextField
												label='Length'
												type='number'
												variant='standard'
												InputProps={{
													inputProps: {
														min: 0,
													},
												}}
												name='length'
												value={
													formState.shipping.length
												}
												inputProps={{
													'data-type': 'Shipping',
												}}
												onChange={inputChange}
											/>
										</Grid>
										<Grid item xs={4} sx={{ p: 2 }}>
											<TextField
												label='Width'
												type='number'
												variant='standard'
												InputProps={{
													inputProps: {
														min: 0,
													},
												}}
												name='width'
												value={formState.shipping.width}
												inputProps={{
													'data-type': 'Shipping',
												}}
												onChange={inputChange}
											/>
										</Grid>
										<Grid item xs={4} sx={{ p: 2 }}>
											<TextField
												label='Height'
												type='number'
												variant='standard'
												InputProps={{
													inputProps: {
														min: 0,
													},
												}}
												name='height'
												value={
													formState.shipping.height
												}
												inputProps={{
													'data-type': 'Shipping',
												}}
												onChange={inputChange}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Portlet>
							<Portlet title={'Options'} sx={{ mb: 2 }}>
								<Grid container>
									<Grid item xs={6} sx={{ p: 2 }}>
										<TextField
											fullWidth={true}
											label='Option Name'
											type='text'
											variant='standard'
											name='name'
											value={formState.options.height}
											inputProps={{
												'data-type': 'Options',
											}}
											onChange={inputChange}
										/>
									</Grid>
									<Grid item xs={6} sx={{ p: 2 }}>
										<Autocomplete
											multiple
											limitTags={2}
											size='small'
											id='multiple-limit-tags'
											onKeyDown={handleAutoComplete}
											onBlur={handleAutoCompleteBlur}
											options={top100Films}
											getOptionLabel={(option) =>
												option.title
											}
											defaultValue={[]}
											renderInput={(params) => (
												<TextField
													{...params}
													variant='standard'
													label='Option Value'
													placeholder='add more'
												/>
											)}
										/>
									</Grid>
								</Grid>
								<Grid container>
									<Grid
										item
										xs={12}
										sx={{ textAlign: 'right', p: 2 }}
									>
										<Divider />
										<Button
											sx={{ mt: 1 }}
											label='Add Option'
											variant='contained'
											size='medium'
											color='primary'
										>
											Add Another Option
										</Button>
									</Grid>
								</Grid>
							</Portlet>
							<Portlet title={'Variants'} sx={{ mb: 2 }}>
								<Grid container>
									<Grid item xs={6} sx={{ p: 2 }}></Grid>
									<Grid item xs={6} sx={{ p: 2 }}></Grid>
								</Grid>
							</Portlet>
						</Grid>
						<Grid item xs={3}>
							<Portlet title={'Publish'} sx={{ mb: 2 }}>
								<Grid container>
									<Grid item xs={6} sx={{ p: 2 }}>
										<Button
											fullWidth={true}
											variant='contained'
											size='medium'
											color='secondary'
										>
											Draft
										</Button>
									</Grid>
									<Grid item xs={6} sx={{ p: 2 }}>
										<Button
											fullWidth={true}
											variant='contained'
											size='medium'
											color='primary'
										>
											Publish
										</Button>
									</Grid>
								</Grid>
							</Portlet>

							<Portlet
								title={'Categories'}
								style={{ marginTop: '10px' }}
								sx={{ mb: 2 }}
							>
								<Grid container>
									<Grid item xs={12} sx={{ p: 2 }}>
										<TextField
											fullWidth={true}
											label='Search Category'
											type='text'
											variant='standard'
											sx={{ mb: 1 }}
										/>
										<IconExpansionTreeView
											data={categories.data.categoryList}
										/>
									</Grid>
								</Grid>
							</Portlet>
							<Portlet
								title={'Media'}
								style={{ marginTop: '10px' }}
								sx={{ mb: 2 }}
							>
								<Grid container>
									<Grid item xs={12} sx={{ p: 2 }}>
										Media
									</Grid>
								</Grid>
							</Portlet>
							<Portlet
								title={'Tags'}
								style={{ marginTop: '10px' }}
								sx={{ mb: 2 }}
							>
								<Grid container>
									<Grid item xs={12} sx={{ p: 2 }}>
										Media
									</Grid>
								</Grid>
							</Portlet>
						</Grid>
					</Grid>
				</form>
			</Box>
		</>
	);
}

export default AdminAddProduct;
