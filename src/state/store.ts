import {configureStore} from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import pagesReducer from './pagesSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    pages: pagesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
