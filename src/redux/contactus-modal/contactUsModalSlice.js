import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../message-modal/errorMessageModalSlice';
import { setSuccessMessage } from '../message-modal/successMessageModalSlice';
import ContactService from '../../services/ContactService';

export const contactUs = createAsyncThunk(
    "contactUsModalSlice/contactUs",
    async ({ name, email, subject, contactMessage }, thunkAPI) => {
        try {
            const response = await ContactService.contactUs(name, email, subject, contactMessage);
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

export const propertySellsContact = createAsyncThunk(
    "contactUsModalSlice/propertySellsContact",
    async ({ name, email, phoneNumber, contactMessage, titleDeadStatus }, thunkAPI) => {
        try {
            const response = await ContactService.propertySellContact(name, email, phoneNumber, contactMessage, titleDeadStatus);
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


