import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

const getCategories = () => {
	return axios.get(baseUrl + '/categories');
};

const getCategory = (slug) => {
	return axios.get(baseUrl + '/categories/' + slug);
};

const createCategory = (data, authToken) => {
	return axios.post(baseUrl + '/categories', data, {
		headers: {
			authToken: authToken,
		},
	});
};

const updateCategory = (slug, data, authToken) => {
	return axios.put(baseUrl + '/categories/' + slug, data, {
		headers: {
			authToken: authToken,
		},
	});
};

const removeCategory = (slug, id, authToken) => {
	return axios.delete(baseUrl + '/categories/' + slug, {
		headers: {
			authToken: authToken,
		},
		data: {
			id,
		},
	});
};

export const categoryService = {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	removeCategory,
};
