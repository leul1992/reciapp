import { HIDEDETAIL, SHOWDETAIL, SHOW_FAVOURITES, HIDE_FAVOURITES } from "../actions"
const initialState = {
    showDetail: '',
    showFavourite: false,
}

export const helperReducer = (state=initialState, action) => {
    switch (action.type) {
        case HIDEDETAIL:
            return {
                ...state,
                showDetail: '',
            };
        case SHOWDETAIL:
            return {
                ...state,
                showDetail: action.payload,

            };
        case SHOW_FAVOURITES:
            return {
                ...state,
                showFavourite: true,
            }
        
        case HIDE_FAVOURITES:
            return {
                ...state,
                showFavourite: false,
            }
        default:
            return state;
    }
}