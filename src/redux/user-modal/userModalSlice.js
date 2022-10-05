import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../message-modal/errorMessageModalSlice';
import { setSuccessMessage } from '../message-modal/successMessageModalSlice';
import AuthService from '../../services/AuthService';

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "userModalSlice/register",
  async ({ username, email, password, passwordConfirmation }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password, passwordConfirmation);
      thunkAPI.dispatch(setSuccessMessage(response.message));
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "userModalSlice/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "userModalSlice/verifyEmail",
  async ({ userId, otp }, thunkAPI) => {
    try {
      const response = await AuthService.verifyEmail(userId, otp);
      thunkAPI.dispatch(setSuccessMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "userModalSlice/requestPasswordReset",
  async ({  email }, thunkAPI) => {
    try {
      const response = await AuthService.requestPasswordReset( email );
      thunkAPI.dispatch(setSuccessMessage(response.message));
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const resetPassword = createAsyncThunk(
  "userModalSlice/requestPasswordReset",
  async ({  email, token, password, passwordConfirmation }, thunkAPI) => {
    try {
      const response = await AuthService.resetPassword( email, token, password, passwordConfirmation );
      thunkAPI.dispatch(setSuccessMessage(response.message));
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


export const resendVerifiactionEmailCode = createAsyncThunk(
  "userModalSlice/resendVerifiactionEmailCode",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await AuthService.resendEmailVerificationCode(userId);
      thunkAPI.dispatch(setErrorMessage(response.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setErrorMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("userModalSlice/logout", async () => {

  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;