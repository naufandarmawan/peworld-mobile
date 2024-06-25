import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import profileReducer from './reducers/profileReducer';
import skillsReducer from './reducers/skillsReducer';
import portfolioReducer from './reducers/portfolioReducer';
import experienceReducer from './reducers/experienceReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    profile: profileReducer,
    skills: skillsReducer,
    portfolio: portfolioReducer,
    experience: experienceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
