import { createAsyncThunk } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';
import i18next from 'i18next';

import {
  getAllFeedBacks as getAllFeedBacksApi,
  addNewFeedBacks as addNewFeedBacksApi,
  approvedFeedBack as approvedFeedBackApi,
  deleteFeedbacks as deleteFeedbacksApi,
} from '../../helpers/backend_helpers.ts';
import { toast } from 'react-toastify';

export const getAllFeedBacks = createAsyncThunk(
  'feedBacks/getAllFeedBacks',
  async () => {
    try {
      const response = getAllFeedBacksApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const addNewFeedBack = createAsyncThunk<any, any>(
  'feedBacks/addNewFeedBacks',
  async (feedbacks: any, { rejectWithValue }) => {
    try {
      const response = addNewFeedBacksApi(feedbacks);
      const data = await response;
      toast.success(i18next.t('added'), { autoClose: 3000 });
      return data;
    } catch (error) {
      let message: any = error;
      toast.error(message, { autoClose: 3000 });
      return rejectWithValue(error);
    }
  },
);
export const approvedFeeback = createAsyncThunk<any, any>(
  'feedBacks/approvedFeedBacks',
  async (feedbacks: any, { rejectWithValue }) => {
    try {
      const response = approvedFeedBackApi(feedbacks);
      const data = await response;
      // toast.success(i18next.t('added'), { autoClose: 3000 });
      return data;
    } catch (error) {
      let message: any = error;
      toast.error(message, { autoClose: 3000 });
      return rejectWithValue(error);
    }
  },
);
export const deleteFeedbacks = createAsyncThunk(
  'courses/deleteFeedbacks',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = deleteFeedbacksApi(id);
      const data = await response;
      toast.success(i18next.t('deleted'), { autoClose: 3000 });
      return data;
    } catch (error) {
      let message: any = error;
      toast.error(message, { autoClose: 3000 });
      return rejectWithValue(error);
    }
  },
);
