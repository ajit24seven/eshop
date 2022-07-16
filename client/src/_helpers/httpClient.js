import axios from 'axios';

export const httpClient = {
	get,
	post,
	put,
	delete: _delete,
};

const axiosClient = axios.create();

axiosClient.defaults.baseURL =
	process.env.REACT_APP_API_BASE_PATH || 'http://localhost:8000/api';

axiosClient.defaults.headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = process.env.REACT_APP_API_TIMEOUT || 2000;

axiosClient.defaults.withCredentials = true;

// Add a request interceptor
axiosClient.interceptors.request.use(
	function (config) {
		if (
			config &&
			config.headers &&
			window.localStorage.getItem('accessToken')
		) {
			config.headers['authToken'] =
				window.localStorage.getItem('accessToken');
		}

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosClient.interceptors.response.use(handleSuccess, handleError);

function get(url, options) {
	const requestOptions = {
		method: 'get',
		url: url,
	};

	if (options && options.headers) {
		requestOptions.headers = buildHeaders(options);
	}

	return axiosClient(requestOptions).then(handleResponse);
}

function post(url, body, options) {
	const requestOptions = {
		method: 'get',
		url: url,
		data: body,
	};

	if (options && options.headers) {
		requestOptions.headers = buildHeaders(options);
	}

	return axiosClient(requestOptions).then(handleResponse);
}

function put(url, body, options) {
	const requestOptions = {
		method: 'put',
		url: url,
		data: body,
	};

	if (options && options.headers) {
		requestOptions.headers = buildHeaders(options);
	}

	return axiosClient(requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, options) {
	const requestOptions = {
		method: 'delete',
		url: url,
	};

	if (options && options.headers) {
		requestOptions.headers = buildHeaders(options);
	}

	return axiosClient(requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
	/* return response.text().then((text) => {
		const data = text && JSON.parse(text);

		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	}); */

	return {
		data: response.data,
		statusCode: response.status,
	};
}

function buildHeaders(options) {
	if (options && options.headers) {
		return options.headers;
	}
}

function handleSuccess(response) {
	return response;
}

function handleError(error) {
	switch (error.response.status) {
		case 401:
			// Token expired
			/* 	delete this.service.defaults.headers['Authorization'];
			window.localStorage.removeItem('token');
			this.redirectTo('/login'); */
			break;
		case 404:
			// Not found
			// this.redirectTo('/404');
			break;
		default:
			// Internal server error
			// this.redirectTo('/500');
			break;
	}
	return Promise.reject(error);
}
