import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

const getProducts = () => {
	return axios.get(baseUrl + '/products');
};

const getProduct = (slug) => {
	return axios.get(baseUrl + '/products/' + slug);
};

const createProduct = (categoryName, authToken) => {
	return axios.post(
		baseUrl + '/products',
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

const updateProduct = (slug, categoryName, authToken) => {
	return axios.put(
		baseUrl + '/products/' + slug,
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

const removeProduct = (slug, authToken) => {
	return axios.delete(baseUrl + '/products/' + slug, {
		headers: {
			authToken: authToken,
		},
	});
};

export const productService = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	removeProduct,
};
