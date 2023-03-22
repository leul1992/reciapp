import { combineReducers } from "@reduxjs/toolkit";
import {preferencesReducer} from "./preferenceReducer";
import { authReducer } from "./authenticationReducer";
const allReducers =combineReducers({
    preferences: preferencesReducer,
    authentication: authReducer,
});

export default allReducers;