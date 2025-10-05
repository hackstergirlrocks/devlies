import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from '../reducers/user'

const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, user);
export const store = configureStore({
    reducer: { user: persistedReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);