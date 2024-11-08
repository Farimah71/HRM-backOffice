import { createSlice } from "@reduxjs/toolkit";

let initialState={
    info:"cv"
}


export let personActionSlice=createSlice({
    name:"personAction",
    initialState,
    reducers:{
        changeAction:(state, action) => {
            state.info=action.payload;
        }
    }    
})