import { createAsyncThunk } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';

import { addFileUpload as addFileUploadApi } from '../../helpers/backend_helpers.ts';
import { toast } from 'react-toastify';

export const addFileUpload = createAsyncThunk<any, any>(
  'file/upload',
  async (file: any, { rejectWithValue }) => {
    try {
      const response = await addFileUploadApi(file);
      return response;
    } catch (error) {
      let message: any = error;
      toast.error(message, { autoClose: 3000 });
      return rejectWithValue(error);
    }
  },
);

export const addPdfFileUpload = createAsyncThunk<any, any>(
  'file/uploadPdf',
  async (file: any, { rejectWithValue }) => {
    try {
      const response = await addFileUploadApi(file);
      return response;
    } catch (error) {
      let message: any = error;
      toast.error(message, { autoClose: 3000 });
      return rejectWithValue(error);
    }
  },
);
