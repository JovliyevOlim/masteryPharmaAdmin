import { createSlice } from '@reduxjs/toolkit';
import { addFileUpload } from './thunk.ts';

interface initialState {
  error: string | null;
  loading: boolean;
  isAction: boolean;
  isSuccess: boolean;
  message: '';
  imageId: string | null;
}

export const initialState: initialState = {
  imageId: null,
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: '',
};

const sliceOptions = {
  name: 'courses',
  initialState,
  reducers: {
    resetImageId(state: any) {
      state.imageId = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(addFileUpload.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(addFileUpload.fulfilled, (state: any, action: any) => {
      state.imageId = action.payload;
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addFileUpload.rejected, (state: any) => {
      state.imageId = null;
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });
  },
};

const userSlice = createSlice(sliceOptions);

export const { resetImageId } = userSlice.actions;

export default userSlice.reducer;
