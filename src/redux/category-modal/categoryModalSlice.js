import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../message-modal/errorMessageModalSlice';
import { setSuccessMessage } from '../message-modal/successMessageModalSlice';
import CategoryService from '../../services/CategoryService';

const category = JSON.parse(localStorage.getItem("category"));

export const addCategory = createAsyncThunk(
    "categoryModalSlice/addCategory",
    async ({ categoryName, subCategory }, thunkAPI) => {
        try {
            const response = await CategoryService.addCategory(categoryName, subCategory);
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


const initialState = category
    ? { isLoaded: true, category }
    : { isLoaded: false, category: null };

const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: {
        [addCategory.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.category = action.payload.category;
        },
        [addCategory.rejected]: (state, action) => {
            state.isLoaded = false;
            state.category = null;
        },
    },
});

const { reducer } = categorySlice;
export default reducer;