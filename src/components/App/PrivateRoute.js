import React  from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, exact, ...rest }) => {
  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;