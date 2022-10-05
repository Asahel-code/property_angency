import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageModalSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      return { errorMessage: action.payload };
    },
    clearErrorMessage: () => {
      return { errorMessage: "" };
    },
  },
});

const { reducer, actions } = messageModalSlice;

export const { setErrorMessage, clearErrorMessage } = actions
export default reducer;