import { loginSuccess, logoutUserSuccess, apiError } from './reducer';
import { postLogin } from '../../helpers/backend_helpers.ts';
import { toast } from 'react-toastify';

export const loginUser =
  (user: any, navigate: any) => async (dispatch: any) => {
    try {
      let response;
      response = postLogin({
        username: user.username,
        password: user.password,
      });
      var data: any = await response;
      if (data) {
        localStorage.setItem('authUser', JSON.stringify(data));
        if (data) {
          dispatch(loginSuccess(data));
          navigate('/courses');
        } else {
          dispatch(apiError(data));
        }
      }
    } catch (error) {
      dispatch(apiError(error));
      toast.error(error, { autoClose: 3000 });
    }
  };

export const loginUserOther = (user: any) => async (dispatch: any) => {
  try {
    let response;
    response = postLogin({
      username: user.username,
      password: user.password,
    });
    var data: any = await response;
    if (data) {
      const today = new Date();
      localStorage.setItem('authUser', JSON.stringify(data));
      localStorage.setItem('savedDate', today.toISOString());
      if (data) {
        dispatch(loginSuccess(data));
      } else {
        dispatch(apiError(data));
      }
    }
  } catch (error:any) {
    dispatch(apiError(error));
    toast.error(error, { autoClose: 3000 });
  }
};

export const logoutUser = () => async (dispatch: any) => {
  try {
    localStorage.removeItem('authUser');
    dispatch(logoutUserSuccess(true));
  } catch (error) {
    dispatch(apiError(error));
  }
};
