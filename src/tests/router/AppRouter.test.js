import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Tests in <AppRouter /> component', () => {
    
    test('should show the please wait message', () => {

        const initialState = {
            auth: {
                checking: true
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        //expect(wrapper.find('h5').text()).toBe('Please Wait...');
    });

    test('should show the public Route', () => {

        const initialState = {
            auth: {
                checking: false,
                uid: null
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('.login-container').exists() ).toBe(true);
    });
    
    test('should show the private Route', () => {

        const initialState = {
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            },
            auth: {
                checking: false,
                uid: '1234',
                name: 'Test User'
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('.calendar-screen').exists() ).toBe(true);
    });
    
})
