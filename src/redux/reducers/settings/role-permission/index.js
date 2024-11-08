import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {}
}

const rolePermissionSlice = createSlice({
  name: "rolePermission",
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

const { actions, reducer } = rolePermissionSlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;
