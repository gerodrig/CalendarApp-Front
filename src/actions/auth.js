import { fetchNoToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { eventLogout } from "./event";

export const startLogin = (email, password) => {
	return async (dispatch) => {
		const response = await fetchNoToken(
			"auth",
			{ email, password },
			"POST"
		);

		const body = await response.json();

		if (body.ok) {
			localStorage.setItem("token", body.token);
			localStorage.setItem("token-init-date", new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: body.message,
				confirmButtonColor: "#0062cc",
			});
		}
	};
};

export const startRegister = (name, email, password, password2) => {
	return async (dispatch) => {
		if (password !== password2) {
			return Swal.fire({
				icon: "error",
				title: "Error",
				text: "Passwords do not match",
				confirmButtonColor: "#0062cc",
			});
		}

		const response = await fetchNoToken(
			"auth/new",
			{ name, email, password },
			"POST"
		);

		const body = await response.json();

		if (body.ok) {
			localStorage.setItem("token", body.token);
			localStorage.setItem("token-init-date", new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: body.message,
				confirmButtonColor: "#0062cc",
			});
		}
	};
};

export const startChecking = () => {
	return async (dispatch) => {

		const response = await fetchWithToken("auth/renew");
		const body = await response.json();

		if (body.ok) {

			localStorage.setItem("token", body.token);
			localStorage.setItem("token-init-date", new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			dispatch(checkingFinish());
		}
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		
		localStorage.clear();
		dispatch(logoutUser());
		dispatch( eventLogout() );

	};
};

const checkingFinish = () => ({ type: types.authCheckingFinish });


const login = (user) => ({
	type: types.authLogin,
	payload: user,
});

const logoutUser = () => ({
	type: types.authLogout,
});

