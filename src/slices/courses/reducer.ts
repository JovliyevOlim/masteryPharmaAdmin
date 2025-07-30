import { createSlice } from '@reduxjs/toolkit';
import {
  addNewCourses,
  getAllCourses,
  deleteCourse,
  updateCourse,
} from './thunk';

interface initialState {
  error: string | null;
  loading: boolean;
  isAction: boolean;
  isSuccess: boolean;
  message: '';
  courses: [];
}

export const initialState: initialState = {
  courses: [],
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
      .addCase(getAllCourses.pending, (state: any) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(getAllCourses.fulfilled, (state: any, action: any) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(getAllCourses.rejected, (state: any) => {
        state.loading = false;
      });

    // add new users
    builder.addCase(addNewCourses.pending, (state: any) => {
      state.loadingTrade = true;
    });
    builder.addCase(addNewCourses.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewCourses.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    builder
      .addCase(updateCourse.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state: any) => {
        state.loading = false;
        state.isSuccess = true;
        state.isAction = !state.isAction;
      })
      .addCase(updateCourse.rejected, (state: any) => {
        state.loading = false;
        state.isSuccess = false;
        state.isAction = !state.isAction;
      });

    builder
      .addCase(deleteCourse.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state: any) => {
        state.loading = false;
        state.isSuccess = true;
        state.isAction = !state.isAction;
      })
      .addCase(deleteCourse.rejected, (state: any) => {
        state.loading = false;
        state.isSuccess = false;
        state.isAction = !state.isAction;
      });
  },
};

const userSlice = createSlice(sliceOptions);

export default userSlice.reducer;
