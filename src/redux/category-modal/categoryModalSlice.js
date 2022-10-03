import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message-modal/messageModalSlice';
import CategoryService from '../../services/CategoryService';

const category = JSON.parse(localStorage.getItem("category"));

export const getCategories = createAsyncThunk(
    "categoryModalSlice/getCategories",
    async (thunkAPI) => {
        try {
            const data = await CategoryService.getCategories();
            return {category: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const addCategory = createAsyncThunk(
    "categoryModalSlice/addCategory",
    async ({ categoryName, subCategory }, thunkAPI) => {
        try {
            const data = await CategoryService.addCategory(categoryName, subCategory);
            return {category: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
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
        [getCategories.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.category = action.payload.category;
        },
        [getCategories.rejected]: (state, action) => {
            state.isLoaded = false;
            state.category = null;
        },
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