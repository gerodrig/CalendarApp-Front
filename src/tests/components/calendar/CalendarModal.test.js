import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moment from "moment";

import "@testing-library/jest-dom";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import {
	eventStartUpdate,
	eventClearActiveEvent,
	eventStartAddNew,
} from "../../../actions/event";
import { act } from "@testing-library/react";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
	fire: jest.fn(),
}));

// import { types } from "../../../types/types";
// import { eventSetActive } from "../../../actions/event";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../actions/event", () => ({
	eventStartUpdate: jest.fn(),
	eventClearActiveEvent: jest.fn(),
	eventStartAddNew: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const now = moment().minutes(0).seconds(0).add(1, "hours");
const after = now.clone().add(1, "hours");

const initialState = {
	calendar: {
		events: [],
		activeEvent: {
			title: "Hello World",
			notes: "Test notes",
			start: now.toDate(),
			end: after.toDate(),
		},
	},
	auth: {
		uid: "123",
		name: "Gerardo",
	},
	ui: {
		modalOpen: true,
	},
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<CalendarModal />
	</Provider>
);

describe("Tests in <CalendarModal />", () => {
	//clear all mocks
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should render CalendarModal", () => {
		//expect(wrapper.find('.modal').exists() ).toBe(true);
		expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
	});

	test("should call update and close action", () => {
		wrapper.find("form").simulate("submit", {
			preventDefault() {},
		});

		console.log(initialState.calendar.activeEvent);

		expect(eventStartUpdate).toHaveBeenCalledWith(
			initialState.calendar.activeEvent
		);
		expect(eventClearActiveEvent).toHaveBeenCalled();
	});

	test("should show error if title is empty", () => {
		wrapper.find("form").simulate("submit", {
			preventDefault() {},
		});

		expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
			true
		);
	});

	test("should create a new event", () => {
		const initialState = {
			calendar: {
				events: [],
				activeEvent: null,
				title: "Hello Tests",
				notes: "Test notes",
				start: now.toDate(),
				end: after.toDate(),
			},
			auth: {
				uid: "123",
				name: "Gerardo",
			},
			ui: {
				modalOpen: true,
			},
		};
		const store = mockStore(initialState);
		store.dispatch = jest.fn();

		const wrapper = mount(
			<Provider store={store}>
				<CalendarModal />
			</Provider>
		);

		wrapper.find('input[name="title"]').simulate("change", {
			target: {
				name: "title",
				value: "Hello Tests",
			},
		});

		wrapper.find("form").simulate("submit", {
			preventDefault() {},
		});

		expect(eventStartAddNew).toHaveBeenCalledWith({
			end: expect.anything(),
			start: expect.anything(),
			title: "Hello Tests",
			notes: "",
			user: expect.anything(),
		});

		expect(eventClearActiveEvent).toHaveBeenCalled();
	});

	test('should validate that the dates are correct', () => {
		wrapper.find('input[name="title"]').simulate("change", {
			target: {
				name: "title",
				value: "Hello Tests",
			},
		});

		const today = new Date();

		act(() => {
			wrapper.find( 'DateTimePicker').at(1).prop('onChange')(today)
		});

		wrapper.find('form').simulate('submit', {
			preventDefault() {}
		});

		expect(Swal.fire).toHaveBeenCalledWith("Error", "End date must be greater than start date", "error");

	});
	
});
