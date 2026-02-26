import { configureStore } from '@reduxjs/toolkit';
import coiReducer from '../features/coi/store/coiSlice';

export const store = configureStore({
  reducer: {
    coi: coiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
