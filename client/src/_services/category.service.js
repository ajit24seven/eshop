import axios from 'axios';

const getCategories = () => {
	return axios.get(process.env.REACT_APP_API_BASE_PATH + '/categories');
};

const getCategory = (slug) => {
	return axios.get(process.env.REACT_APP_API_BASE_PATH + '/category/' + slug);
};

const createCategory = (categoryName, authToken) => {
	return axios.post(
		process.env.REACT_APP_API_BASE_PATH + '/category',
		{
			name: categoryName,
		},
		{
			headers: {
				authToken: authToken,
			},
		}
	);
};

const updateCategory = (slug, categoryName, authToken) => {
	return axios.put(
		process.env.REACT_APP_API_BASE_PATH + '/category/' + slug,
		{
			name: categoryName,
		},
		{
			headers: {
				authToken: authToken,
			},
		}
	);
};

const removeCategory = (slug, authToken) => {
	return axios.delete(
		process.env.REACT_APP_API_BASE_PATH + '/category/' + slug,
		{
			headers: {
				authToken: authToken,
			},
		}
	);
};

export const categoryService = {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	removeCategory,
};
