import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import "@testing-library/jest-dom";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { BrowserRouter as Router } from "react-router-dom";
import { startLogin } from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
	startLogin: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<Router>
			<LoginScreen />
		</Router>
	</Provider>
);

describe("Tests in <LoginScreen /> component", () => {
	test("should render component correctly", () => {
		expect(wrapper).toMatchSnapshot();
	});

	test("should call login disptach", () => {
		wrapper.find('input[name="loginEmail"]').simulate("change", {
			target: {
				name: "loginEmail",
				value: "gerardo@outlook.com",
			},
		});
		wrapper.find('input[name="loginPassword"]').simulate("change", {
			target: {
				name: "loginPassword",
				value: "123456",
			},
		});

		wrapper.find("form").at(0).prop("onSubmit")({ preventDefault() {} });
		expect(startLogin).toHaveBeenCalledWith(
			"gerardo@outlook.com",
			"123456"
		);
	});

		//startRegister is not called
		//Swal fire with the same arguments as component
});
