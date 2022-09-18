import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message-modal/messageModalSlice';
import PropertyService from '../../services/PropertyService';

const properties = JSON.parse(localStorage.getItem("properties"));

export const getProperties = createAsyncThunk(
    "propertiesModalSlice/getProperties",
    async (thunkAPI) => {
        try {
            const response = await PropertyService.getProperties();
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
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

export const addProperty = createAsyncThunk(
    "propertyModalSlice/addProperty",
    async (formData, thunkAPI) => {
        try {
            const response = await PropertyService.addProperty(formData);
            return response.data;
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

export const updateProperty = createAsyncThunk(
    "propertyModalSlice/updateProperty",
    async ({ formData, name }, thunkAPI) => {
        try {
            const response = await PropertyService.updateProperty(formData, name);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
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

export const deleteProperty = createAsyncThunk("propertyModalSlice/deleteProperty", async (propertyName) => {
    await PropertyService.deleteProperty(propertyName);
});


const initialState = properties
    ? { isLoaded: true, properties }
    : { isLoaded: false, properties: null };

const propertySlice = createSlice({
    name: "property",
    initialState,
    extraReducers: {
        [getProperties.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.properties = action.payload.properties;
        },
        [getProperties.rejected]: (state, action) => {
            state.isLoaded = false;
        },
        [addProperty.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.property = action.payload.property;
        },
        [addProperty.rejected]: (state, action) => {
            state.isLoaded = false;
        },
        [updateProperty.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.property = action.payload.property;
        },
        [updateProperty.rejected]: (state, action) => {
            state.isLoaded = false;
        },
        [deleteProperty.fulfilled]: (state, action) => {
            state.isLoaded = false;
            state.property = null;
        },
        [deleteProperty.rejected]: (state, action) => {
            state.isLoaded = false;
        },
    },
});

const { reducer } = propertySlice;
export default reducer;