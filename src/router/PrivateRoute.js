import React from "react";
import Proptypes from "prop-types";

import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => {
	return (
		<Route {...rest}
			component=
			{(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	)
};

PrivateRoute.propTypes = {
	isAuthenticated: Proptypes.bool.isRequired,
	component: Proptypes.func.isRequired,
};
