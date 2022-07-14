import axios from 'axios';

export const httpService = {
	get,
	post,
	put,
	delete: _delete,
};

function get(url, options) {
	const requestOptions = {
		method: 'get',
		url: url,
		headers: options.headers,
	};

	return axios(requestOptions).then(handleResponse);
}

function post(url, body, options) {
	const requestOptions = {
		method: 'get',
		url: url,
		data: body,
		headers: options.headers,
	};

	return axios(requestOptions).then(handleResponse);
}

function put(url, body, options) {
	const requestOptions = {
		method: 'put',
		url: url,
		data: body,
		headers: options.headers,
	};

	return axios(requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, options) {
	const requestOptions = {
		method: 'delete',
		url: url,
		headers: options.headers,
	};

	return axios(requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);

		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
