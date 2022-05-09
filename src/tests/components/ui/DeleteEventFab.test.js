import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import "@testing-library/jest-dom";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventStartDelete } from "../../../actions/event";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);

store.dispatch = jest.fn();

jest.mock("../../../actions/event", eventStartDelete => ({
    eventStartDelete: jest.fn()
})
);


const wrapper = mount(
	<Provider store={store}>
		<DeleteEventFab />
	</Provider>
);

describe("Tests in <DeleteEventFab /> component", () => {
	test("should component be rendered correctly", () => {
		expect(wrapper).toMatchSnapshot();
	});

    test('should call the eventStartDelete when clicking the button', () => {
        
        wrapper.find('button').prop('onClick')();

        expect( eventStartDelete ).toHaveBeenCalled();
    })
    
});
