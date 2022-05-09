import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { fetchNoToken } from '../../helpers/fetch';

//import fetch to create mock
import * as fetchModule from '../../helpers/fetch';
import { types } from '../../types/types';

//mock to sweet alert
jest.mock('sweetalert2', () => ({
	fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

let token = '';

Storage.prototype.setItem = jest.fn();

describe('tests in Auth actions', () => {
	beforeEach(() => {
		store = mockStore(initialState);
		jest.clearAllMocks();
	});

	test('should loginUser action work', async () => {
		const response = await fetchNoToken(
			'auth',
			{ email: 'gerry@outlook.com', password: '123456' },
			'POST'
		);
		const body = await response.json();

		token = body.token;

		store.dispatch(startLogin(body.uid, body.name));

		const actions = store.getActions();
		expect(actions).toEqual([]);

		expect(body.ok).toBe(true);
	});

	test('should test incorrect login', async () => {
		await store.dispatch(startLogin('gerry@outlook.com', '12345678'));

		let actions = store.getActions();

		expect(actions).toEqual([]);
		expect(Swal.fire).toHaveBeenCalledWith({
			confirmButtonColor: '#0062cc',
			icon: 'error',
			text: 'User and password don\'t match',
			title: 'Error',
		});

		await store.dispatch(startLogin('gerry@outlook22.com', '123456'));

		actions = store.getActions();

		expect(Swal.fire).toHaveBeenCalledWith({
			confirmButtonColor: '#0062cc',
			icon: 'error',
			text: 'User and password don\'t match',
			title: 'Error',
		});
	});

	test('should startRegister works correctly', async () => {
		fetchModule.fetchNoToken = jest.fn(() => ({
			json() {
				return {
					ok: true,
					uid: '123',
					name: 'Gerry',
					token: 'ABC123ABC123',
				};
			},
		}));

		await store.dispatch(
			startRegister('test1515@test.com', '123456', 'test')
		);

		const actions = store.getActions();

		expect(actions).toEqual([]);
	});

    test('Should startChecking works correctly', async () => {

        fetchModule.fetchNoToken = jest.fn(() => ({
			json() {
				return {
					ok: true,
					uid: '123',
					name: 'Gerry',
					token: 'ABC123ABC123',
				};
			},
		}));

            await store.dispatch(startChecking());

            const actions = store.getActions();
            
            console.log(actions[0]);

            expect(actions[0]).toEqual({
                type: types.authCheckingFinish
            });

            //expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123ABC123');
    });
});
