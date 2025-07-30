import { createSlice } from '@reduxjs/toolkit';
import { getAllStudents } from './thunk';

interface initialState {
  error: string | null;
  loading: boolean;
  isAction: boolean;
  isSuccess: boolean;
  message: '';
  students: [];
}

export const initialState: initialState = {
  students: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: '',
};

const sliceOptions = {
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    // get all courses
    builder
      .addCase(getAllStudents.pending, (state: any) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(getAllStudents.fulfilled, (state: any, action: any) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(getAllStudents.rejected, (state: any) => {
        state.loading = false;
      });
  },
};

const userSlice = createSlice(sliceOptions);

export default userSlice.reducer;
