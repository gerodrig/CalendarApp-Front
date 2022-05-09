import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "@testing-library/react";

import "@testing-library/jest-dom";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { types } from "../../../types/types";
import { eventSetActive } from "../../../actions/event";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../actions/event", () => ({
	eventSetActive: jest.fn(),
	eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const initialState = {
	calendar: {
		events: [],
	},
	auth: {
		uid: "123",
		name: "Gerardo",
	},
	ui: {
		openModal: false,
	},
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<CalendarScreen />
	</Provider>
);

describe("Should test the <CalendarScreen /> component", () => {
	test("should render Calendar snapshot", () => {
		expect(wrapper).toMatchSnapshot();
	});

	test("should show the calendar interactions", () => {
		const calendar = wrapper.find("Calendar");

		const calendarMessages = calendar.props("messages");

		expect(calendarMessages).toBeDefined();

		calendar.prop("onDoubleClickEvent")();
		expect(store.dispatch).toHaveBeenCalledWith({
			type: types.uiOpenModal,
		});

		calendar.prop("onSelectEvent")({ start: "Today" });
		expect(eventSetActive).toHaveBeenCalledWith({ start: "Today" });

		act(() => {
			calendar.prop("onView")("week");
			expect(localStorage.setItem).toHaveBeenCalledWith(
				"lastView",
				"week"
			);
		});
	});
});
