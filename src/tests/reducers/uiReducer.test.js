import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initialSate = {
	modalOpen: false,
};

describe("Tests in UI reducer", () => {
	test("should return return the initial state.", () => {
		const state = uiReducer(initialSate, {});

		expect(state).toEqual(initialSate);
	});

	test("should open and close modal", () => {
		const modalOpen = uiOpenModal();

		const state = uiReducer(initialSate, modalOpen);

		expect(state).toEqual({ modalOpen: true });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer(state, modalClose);

        expect(stateClose).toEqual({ modalOpen: false });
        
	});
});
