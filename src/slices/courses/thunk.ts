import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18next from 'i18next';

//Include Both Helper File with needed methods

import {
  getAllCourses as getAllCoursesApi,
  addNewCourses as addNewCoursesApi,
  deleteCourses as deleteCoursesApi,
  updateCourses as updateCoursesApi,
} from '../../helpers/backend_helpers.ts';

export const getAllCourses = createAsyncThunk(
  'courses/getAllCourses',
  async () => {
    try {
      const response = getAllCoursesApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const addNewCourses = createAsyncThunk<any, any>(
  'courses/addNewCourses',
  async (user: any, { rejectWithValue }) => {
    try {
      const response = addNewCoursesApi(user);
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

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async (user: any, { rejectWithValue }) => {
    try {
      const response = updateCoursesApi(user);
      const data = await response;
      toast.success(i18next.t('updated'), { autoClose: 3000 });
      return data;
    } catch (error) {
      let message: any = error;
      toast.error(message, { autoClose: 3000 });
      return rejectWithValue(error);
    }
  },
);
export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = deleteCoursesApi(id);
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
