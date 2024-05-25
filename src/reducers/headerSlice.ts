import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

const initialState = {
  add: false,
  search: false,
  filter: false,
};

const headerSlice = createSlice({
  name: "headerActions",
  initialState,
  reducers: {
    setAdd(state: any) {
      state.add = true;
    },
    setSearch(state: any) {
      state.search = true;
    },
    setFilter(state: any) {
      state.filter = true;
    },
    falsifyAll(state: any) {
      state.add = false;
      state.search = false;
      state.filter = false;
    },
  },
});

export const { setAdd, setSearch, setFilter, falsifyAll } = headerSlice.actions;

export const setHeader =
  async (action: "add" | "search" | "filter" | "falsifyAll") =>
  async (dispatch: AppDispatch) => {
    await dispatch(falsifyAll());

    switch (action) {
      case "add":
        dispatch(setAdd());
        break;
      case "search":
        dispatch(setSearch());
        break;
      case "filter":
        dispatch(setFilter());
        break;
    }
  };

export default headerSlice.reducer;
