import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    Component
  ) : (
    <Navigate to="/Login" state={{ from: location }} />
  );
};

export default PrivateRoute;
