import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  theme: "light",
};

let themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      state.theme = "dark";
    },
    setLightTheme: (state, action) => {
      state.theme = "light";
    },
  },
});

let { actions, reducer } = themeSlice;

export let { setDarkTheme, setLightTheme } = actions;
export default reducer;
