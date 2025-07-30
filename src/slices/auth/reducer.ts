import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: {},
  error: '', // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error,
  isAction: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = true;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    loginSuccess(state, action) {
      console.log(localStorage.getItem('authUser'));
      state.user = action.payload;
      state.loading = false;
      state.errorMsg = false;
      state.isAction = !state.isAction;
    },
    logoutUserSuccess(state) {
      state.isUserLogout = true;
    },
    reset_login_flag(state: any) {
      state.error = null;
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const { apiError, loginSuccess, logoutUserSuccess, reset_login_flag } =
  loginSlice.actions;

export default loginSlice.reducer;
