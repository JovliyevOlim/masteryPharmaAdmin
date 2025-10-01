import { createSlice } from '@reduxjs/toolkit';
import { addFileUpload, addPdfFileUpload } from './thunk.ts';

interface initialState {
  error: string | null;
  loading: boolean;
  isAction: boolean;
  isSuccess: boolean;
  isActionFilePdf: boolean;
  isSuccessFilePdf: boolean;
  message: '';
  imageId: number | null;
  fileId: number | null;
}

export const initialState: initialState = {
  imageId: null,
  fileId: null,
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  isActionFilePdf: false,
  isSuccessFilePdf: false,
  message: '',
};

const sliceOptions = {
  name: 'courses',
  initialState,
  reducers: {
    resetImageId(state: any) {
      state.imageId = null;
      state.fileId = null;
      state.isSuccess = false;
    },
    setImageId(state: any, action: any) {
      state.imageId = action.payload;
      state.isSuccess = true;
    },
    setFileId(state: any, action: any) {
      state.fileId = action.payload;
      state.isSuccessFilePdf = true;
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
    builder.addCase(addPdfFileUpload.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(addPdfFileUpload.fulfilled, (state: any, action: any) => {
      state.fileId = action.payload;
      state.loading = false;
      state.isSuccessFilePdf = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addPdfFileUpload.rejected, (state: any) => {
      state.fileId = null;
      state.loading = false;
      state.isSuccessFilePdf = false;
      state.isAction = !state.isAction;
    });
  },
};

const userSlice = createSlice(sliceOptions);

export const { resetImageId, setImageId, setFileId } = userSlice.actions;

export default userSlice.reducer;
