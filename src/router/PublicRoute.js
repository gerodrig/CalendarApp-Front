import React from "react";
import Proptypes from "prop-types";

import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => {
	return (
		<Route {...rest}
			component=
			{(props) =>
				isAuthenticated ? (<Redirect to="/" />) : (<Component {...props} />)
			}
		/>
	);
};

PublicRoute.propTypes = {
    isAuthenticated: Proptypes.bool.isRequired,
    component: Proptypes.func.isRequired
};
