import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  downloadLink: {},
  loading: false,
};

const personCVSlice = createSlice({
  name: "personCV",
  initialState,
  reducers: {
    setDownloadLink: (state, action) => {
      state.downloadLink = action.payload;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { actions, reducer } = personCVSlice;
export const { setDownloadLink, setLoading } = actions;
export default reducer;
