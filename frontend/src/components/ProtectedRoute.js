import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ isLogin, path, ...props }) {
  return isLogin ? <Route {...props} /> : <Redirect to="/signin" />;
}
