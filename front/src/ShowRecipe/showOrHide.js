import { useSelector, useDispatch } from "react-redux";
import { hideDetails, showDetails, showFavourites, hideFavourites } from "../actions";

export default function useHelper() {
    const details = useSelector(state => state.helper)
    const dispatch = useDispatch();
    const hideDetail = () => {
        dispatch(hideDetails())
    }
    const showDetail = (recipeid) => {
        dispatch(showDetails(recipeid));
    }
    const showFavourite = () => {
        dispatch(showFavourites());
    }
    const hideFavourite = () => {
        dispatch(hideFavourites());
    }
    return {
        details, hideDetail, showDetail, showFavourite, hideFavourite
    };
}