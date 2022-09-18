import { configureStore } from '@reduxjs/toolkit';
import messageModalReducer from './message-modal/messageModalSlice';
import userModalReducer from './user-modal/userModalSlice';
import categoryModalReducer from './category-modal/categoryModalSlice';
import porpertyModalReducer from './property-modal/propertyModalSlice';
 
export const store = configureStore({
    reducer: {
        message: messageModalReducer,
        auth: userModalReducer,
        category: categoryModalReducer,
        property: porpertyModalReducer,
    }
});