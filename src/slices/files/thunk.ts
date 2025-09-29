import { createAsyncThunk } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';

import {
  addFileUpload as addFileUploadApi,
  getFileById as getFileByIdApi,
} from '../../helpers/backend_helpers.ts';
import { toast } from 'react-toastify';
import i18next from 'i18next';


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
