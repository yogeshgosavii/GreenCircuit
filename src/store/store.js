import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authSlice,
    // Add more reducers if needed
});

// Wrap combined reducer with Redux Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    // Add middleware or enhancers if needed
});

export default store;
