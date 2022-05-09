import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initialState = {
	checking: true,
};

describe('Tests in authReducer.js', () => {
	test('should return initial state', () => {
		const state = authReducer(initialState, {});

		expect(state).toEqual({ checking: true });
	});

	test('should test the user authentication', () => {
		const action = {
			type: types.authLogin,
			payload: { uid: '123', name: 'Gerardo' },
		};

		const state = authReducer(initialState, action);

		expect(state).toEqual({ checking: false, uid: '123', name: 'Gerardo' });
	});
});
