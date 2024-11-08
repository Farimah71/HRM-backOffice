
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    info: {}
}

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        setInfo: (state, action) => {
            state.info = action.payload;
        }
    }
})

const { actions, reducer } = serviceSlice;
export const { setInfo } = actions;
export default reducer;