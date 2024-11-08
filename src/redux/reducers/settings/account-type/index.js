import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: {},
    editInfo: {}
}

const accountTypeSlice = createSlice({
    name: "accountType",
    initialState,
    reducers: {
        setInfo: (state, action) => {
            state.info = action.payload
        },
        setEditInfo: (state, action) => {
            state.editInfo = action.payload;
        }
    }
})

const { actions, reducer } = accountTypeSlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;