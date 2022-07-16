import { httpClient } from '../_helpers';

const getProducts = () => {
	return httpClient.get('/products');
};

const getProduct = (slug) => {
	return httpClient.get('/products/' + slug);
};

const createProduct = (categoryName) => {
	return httpClient.post('/products', {
		name: categoryName,
	});
};

const updateProduct = (slug, categoryName) => {
	return httpClient.put('/products/' + slug, {
		name: categoryName,
	});
};

const removeProduct = (slug) => {
	return httpClient.delete('/products/' + slug);
};

export const productService = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	removeProduct,
};
