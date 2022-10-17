import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../message-modal/errorMessageModalSlice';
import { setSuccessMessage } from '../message-modal/successMessageModalSlice';
import PropertyService from '../../services/PropertyService';

const properties = JSON.parse(localStorage.getItem("properties"));

export const searchProperties = createAsyncThunk(
    "propertiesModalSlice/searchProperties",
    async ({ propertyCategory, subCategory, location, price }, thunkAPI) => {
        try {
            const data = await PropertyService.searchProperties(propertyCategory, subCategory, location, price);
            return {properties : data};
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

export const addProperty = createAsyncThunk(
    "propertyModalSlice/addProperty",
    async (formData, thunkAPI) => {
        try {
            const response = await PropertyService.addProperty(formData);
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

export const updateProperty = createAsyncThunk(
    "propertyModalSlice/updateProperty",
    async ({ formData, propertyName }, thunkAPI) => {
        try {
            const data = await PropertyService.updateProperty(formData, propertyName);
            return {properties : data};
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



const initialState = properties
    ? { isLoaded: true, properties }
    : { isLoaded: false, properties: null };

const propertySlice = createSlice({
    name: "property",
    initialState,
    extraReducers: {
        [searchProperties.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.properties = action.payload.properties;
        },
        [searchProperties.rejected]: (state, action) => {
            state.isLoaded = false;
            state.properties = null;
        },
        [addProperty.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.properties = action.payload.properties;
        },
        [addProperty.rejected]: (state, action) => {
            state.isLoaded = false;
            state.properties = null;
        },
        [updateProperty.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.properties = action.payload.properties;
        },
        [updateProperty.rejected]: (state, action) => {
            state.isLoaded = false;
            state.properties = null;
        },
    },
});

const { reducer } = propertySlice;
export default reducer;