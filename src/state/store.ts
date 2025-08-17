import {configureStore} from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import pagesReducer from './pagesSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    pages: pagesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
