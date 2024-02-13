import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/UserSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
