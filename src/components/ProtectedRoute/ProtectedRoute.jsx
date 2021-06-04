// eslint-disable react/jsx-props-no-spreading
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, loggedIn, ...props }) => {
  return <Route>{() => (loggedIn ? <Component {...props} /> : <Redirect to="./signup" />)}</Route>;
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
