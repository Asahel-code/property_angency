import { configureStore } from '@reduxjs/toolkit';
import errorMessageModalReducer from './message-modal/errorMessageModalSlice';
import successMessageModalReducer from './message-modal/successMessageModalSlice';
import userModalReducer from './user-modal/userModalSlice';
import categoryModalReducer from './category-modal/categoryModalSlice';
import porpertyModalReducer from './property-modal/propertyModalSlice';
 
export const store = configureStore({
    reducer: {
        errorMessage: errorMessageModalReducer,
        successMessage: successMessageModalReducer,
        auth: userModalReducer,
        category: categoryModalReducer,
        property: porpertyModalReducer,
    }
});