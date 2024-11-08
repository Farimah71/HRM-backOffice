import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {}
}

const leaveTypeSlice = createSlice({
  name: "leaveType",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    }
  },
});

const { actions, reducer } = leaveTypeSlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;
