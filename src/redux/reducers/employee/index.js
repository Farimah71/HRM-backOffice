import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
  count: 0,
};

const employeeSlice = createSlice({
  name: "employee",
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

const { actions, reducer } = employeeSlice;
export const { setInfo, setEditInfo, setLoading, setCount } = actions;
export default reducer;
