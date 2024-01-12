import {configureStore} from "@reduxjs/toolkit";
import characterReducer from "./slices/character.js"


const store = configureStore({
    reducer: {
        character: characterReducer,
    }
});

export default store;
