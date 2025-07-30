import { createSlice } from '@reduxjs/toolkit';
import { getAllFeedBacks, addNewFeedBack, approvedFeeback } from './thunk';

interface initialState {
  error: string | null;
  loading: boolean;
  isAction: boolean;
  isSuccess: boolean;
  message: '';
  feedbacks: [];
}

export const initialState: initialState = {
  feedbacks: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: '',
};

const sliceOptions = {
  name: 'feedbacks',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    // get all courses
    builder
      .addCase(getAllFeedBacks.pending, (state: any) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(getAllFeedBacks.fulfilled, (state: any, action: any) => {
        state.feedbacks = action.payload;
        state.loading = false;
      })
      .addCase(getAllFeedBacks.rejected, (state: any) => {
        state.loading = false;
      });

    builder.addCase(addNewFeedBack.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(addNewFeedBack.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewFeedBack.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    builder.addCase(approvedFeeback.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(approvedFeeback.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(approvedFeeback.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });
  },
};

const userSlice = createSlice(sliceOptions);

export default userSlice.reducer;
