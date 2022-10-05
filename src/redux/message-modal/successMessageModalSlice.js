import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageModalSlice = createSlice({
  name: "successMessage",
  initialState,
  reducers: {
    setSuccessMessage: (state, action) => {
      return { successMessage: action.payload };
    },
    clearSuccessMessage: () => {
      return { successMessage: "" };
    },
  },
});

const { reducer, actions } = messageModalSlice;

export const {  setSuccessMessage,  clearSuccessMessage } = actions
export default reducer;