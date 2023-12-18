import { configureStore } from '@reduxjs/toolkit';
import { moduleReducer } from './moduleSlice';

export const store = configureStore({ reducer: { module: moduleReducer } });