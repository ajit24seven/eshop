import { httpClient } from '../_helpers';

const getCategories = () => {
	return httpClient.get('/categories');
};

const getCategory = (slug) => {
	return httpClient.get('/categories/' + slug);
};

const createCategory = (data) => {
	return httpClient.post('/categories', data);
};

const updateCategory = (slug, data) => {
	return httpClient.put('/categories/' + slug, data);
};

const removeCategory = (slug, id) => {
	return httpClient.delete('/categories/' + slug, {
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
