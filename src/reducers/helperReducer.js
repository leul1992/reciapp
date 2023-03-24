import { HIDEDETAIL, SHOWDETAIL } from "../actions"
const initialState = {
    showDetail: false,
}

export const helperReducer = (state=initialState, action) => {
    switch (action.type) {
        case HIDEDETAIL:
            return {
                ...state,
                showDetail: false,
            };
        case SHOWDETAIL:
            return {
                ...state,
                showDetail: true,
            };
        default:
            return state;
    }
}