import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import searchReducer from "./searchSlice.js";

const store = configureStore({
    reducer:{
        app:userReducer,
        search:searchReducer,
    }   
})

export default store;