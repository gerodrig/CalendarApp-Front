import React from "react";
import Swal from "sweetalert2";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import "@testing-library/jest-dom";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { BrowserRouter as Router } from "react-router-dom";
import { startRegister } from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
	startRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
	fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<Router>
			<RegisterScreen />
		</Router>
	</Provider>
);

describe("Tests in <LoginScreen /> component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should render component correctly", () => {
		expect(wrapper).toMatchSnapshot();
	});

	test("should not register if passwords are different", () => {
		//1-2 .. password1 and password2 simutlates the same input
		wrapper.find('input[name="registerPassword"]').simulate("change", {
			target: {
				name: "registerPassword",
				value: "123456",
			},
		});
		wrapper.find('input[name="registerPassword2"]').simulate("change", {
			target: {
				name: "registerPassword2",
				value: "1234567",
			},
		});

		wrapper.find("form").at(0).prop("onSubmit")({ preventDefault() {} });

		//startRegister is not called
		expect(startRegister).toHaveBeenCalled();

		//Swal fire is called from the backend
	});

	test("should register if passwords are the same", () => {
		wrapper.find('input[name="registerPassword"]').simulate("change", {
			target: {
				name: "registerPassword",
				value: "123456",
			},
		});
		wrapper.find('input[name="registerPassword2"]').simulate("change", {
			target: {
				name: "registerPassword2",
				value: "123456",
			},
		});

		wrapper.find("form").at(0).prop("onSubmit")({ preventDefault() {} });

		//startRegister is not called
		expect(Swal.fire).not.toHaveBeenCalled();
		expect(startRegister).toHaveBeenCalled();
	});
});
