import { createAsyncThunk } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';


import { getAllStudents as getAllStudentsApi } from '../../helpers/backend_helpers.ts';

export const getAllStudents = createAsyncThunk(
  'courses/getAllStudents',
  async () => {
    try {
      const response = getAllStudentsApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
