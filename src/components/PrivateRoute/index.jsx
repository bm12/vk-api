import React, { useEffect } from 'react';

import { Route } from 'react-router-dom';
import { redirectToAuth, getAuthStatus, authStatuses } from '@/modules/auth';

const PrivateRoute = ({ ...otherProps }) => {
  const authStatus = getAuthStatus();

  useEffect(() => {
    if (authStatus === authStatuses.notAuthed) {
      redirectToAuth();
    }
  }, [authStatus]);

  return authStatus === authStatuses.authed ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...otherProps} />
  ) : null;
};

export default PrivateRoute;
