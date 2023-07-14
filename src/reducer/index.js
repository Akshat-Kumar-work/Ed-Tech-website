import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"

//this rootReducer contain all reducer 
const rootReducer = combineReducers({

    auth:authReducer

})

export default rootReducer;