import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_PATH;
const url = baseUrl + '/sub/';

const getSubs = () => {
	return axios.get(url);
};

const getSub = (slug) => {
	return axios.get(url + slug);
};

const createSub = (subName, authToken) => {
	return axios.post(
		url,
		{
			name: subName,
		},
		{
			headers: {
				authToken: authToken,
			},
		}
	);
};

const updateSub = (slug, subName, authToken) => {
	return axios.put(
		url + slug,
		{
			name: subName,
		},
		{
			headers: {
				authToken: authToken,
			},
		}
	);
};

const removeSub = (slug, authToken) => {
	return axios.delete(url + slug, {
		headers: {
			authToken: authToken,
		},
	});
};

export const subService = {
	getSubs,
	getSub,
	createSub,
	updateSub,
	removeSub,
};
