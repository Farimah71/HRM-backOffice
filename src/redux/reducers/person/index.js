import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
  fetchedPerson: {},
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setFetchedPerson: (state, action) => {
      state.fetchedPerson = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearFetchedPerson: (state) => {
      state.fetchedPerson = {};
    },
  },
});

const { actions, reducer } = personSlice;
export const { setInfo, setFetchedPerson, setEditInfo, setLoading, clearFetchedPerson } =
  actions;
export default reducer;
