import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message-modal/messageModalSlice';
import ContactService from '../../services/ContactService';

export const contactUs = createAsyncThunk(
    "contactUsModalSlice/contactUs",
    async ({ name, email, subject, contactMessage }, thunkAPI) => {
        try {
            const response = await ContactService.contactUs(name, email, subject, contactMessage);
            thunkAPI.dispatch(setMessage(response.message));
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

export const propertySellsContact = createAsyncThunk(
    "contactUsModalSlice/propertySellsContact",
    async ({ name, email, phoneNumber, contactMessage, titleDeadStatus }, thunkAPI) => {
        try {
            const response = await ContactService.propertySellContact(name, email, phoneNumber, contactMessage, titleDeadStatus);
            thunkAPI.dispatch(setMessage(response.message));
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


