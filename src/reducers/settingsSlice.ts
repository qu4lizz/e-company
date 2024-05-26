import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import {
  getLanguage,
  getTheme,
  updateLanguage,
  updateTheme,
} from "../db/settings";

const initialState = {
  language: "sr-Latn",
  theme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setLanguage, setTheme } = settingsSlice.actions;

export const initializeSettings = () => {
  return async (dispatch: AppDispatch) => {
    const language = await getLanguage();
    const theme = await getTheme();
    dispatch(setLanguage(language));
    dispatch(setTheme(theme));
  };
};

export const setThemeAsync = (theme: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTheme(theme));
    updateTheme(theme);
  };
};

export const setLanguageAsync = (language: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLanguage(language));
    updateLanguage(language);
  };
};

export default settingsSlice.reducer;
