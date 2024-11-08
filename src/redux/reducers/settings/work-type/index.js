import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false
}

const workTypeSlice = createSlice({
  name: "workType",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { actions, reducer } = workTypeSlice;
export const { setInfo, setEditInfo, setLoading } = actions;
export default reducer;