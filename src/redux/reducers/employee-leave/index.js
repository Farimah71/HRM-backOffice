import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  count: 0,
  loading: false,
};

const employeeLeaveSlice = createSlice({
  name: "employeeLeave",
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
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

const { actions, reducer } = employeeLeaveSlice;
export const { setInfo, setEditInfo, setLoading, setCount } = actions;
export default reducer;
