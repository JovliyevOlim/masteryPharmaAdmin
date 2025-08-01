import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { setAuthorization } from '../helpers/api_helpers.ts';
import { useDispatch } from 'react-redux';

import { useProfile } from '../hooks/userHooks.ts';

import { logoutUser } from '../slices/auth/thunk.ts';

const AuthProtected = (props: any) => {
  const dispatch: any = useDispatch();
  const { userProfile, loading, token } = useProfile();

  useEffect(() => {
    if (userProfile && !loading && token) {
      setAuthorization(token);
    } else if (!userProfile && loading && !token) {
      dispatch(logoutUser());
    }
  }, [token, userProfile, loading, dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */
  if (!userProfile && loading && !token) {
    return (
      <Navigate to={{ pathname: '/login' }} />
    );
  }

  return <>{props.children}</>;
};


export default AuthProtected;