const baseUrl = process.env.REACT_APP_API_URL;

const fetchNoToken = (endpoint, data, method = "GET") => {
	const url = `${baseUrl}/${endpoint}`; // localhost:8081/api/auth or herokuapp.com

	if (method === "GET") {
		return fetch(url);
	} else {
		return fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	}
};

const fetchWithToken = (endpoint, data, method = "GET") => {
	const url = `${baseUrl}/${endpoint}`; // localhost:8081/api/auth or herokuapp.com
	const token = localStorage.getItem("token") || "";

	if (method === "GET") {
		return fetch(url, {
			method,
			headers: {
				"x-token": token,
			},
		});
	} else {
		return fetch(url, {
			method,
			headers: {
				"x-token": token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
};

export { fetchNoToken, fetchWithToken };
