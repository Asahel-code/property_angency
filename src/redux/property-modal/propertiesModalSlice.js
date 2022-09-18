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


const initialState = properties
    ? { isLoaded: true, properties }
    : { isLoaded: false, properties: null };

const propertiesSlice = createSlice({
    name: "properties",
    initialState,
    extraReducers: {
        [getProperties.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.properties = action.payload.properties;
        },
        [getProperties.rejected]: (state, action) => {
            state.isLoaded = false;
        },
    },
});

const { reducer } = propertiesSlice;
export default reducer;