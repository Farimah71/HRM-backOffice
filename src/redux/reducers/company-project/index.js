import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    info: {},
    editInfo: {},
    loading: false
}

const companyProjectSlice = createSlice({
    name: "companyProject",
    initialState,
    reducers: {
        setInfo: (state, action) => {
            state.info = action.payload;
        },
        setEditInfo: (state, action) => {
            state.editInfo = action.payload;
        },
        setLoaing: (state, action) => {
            state.loading = action.payload;
        }
    }
})

const { actions, reducer } = companyProjectSlice;
export const { setInfo, setEditInfo, setLoaing } = actions;
export default reducer;