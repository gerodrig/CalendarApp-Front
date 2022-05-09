import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

export const Navbar = ({ onSetLanguage }) => {
	const dispatch = useDispatch();

	const { name } = useSelector((state) => state.auth);

	const [isToggled, setToggled] = useState(" FR");

	const toggleTrueFalse = () =>
		setToggled(isToggled === " EN" ? " FR" : " EN");

	useEffect(() => {
		onSetLanguage(isToggled);
	}, [isToggled, onSetLanguage]);

	const logoutHandler = () => {
		dispatch(startLogout());

	};

	return (
		<div className="navbar navbar-dark bg-primary mb-4">
			<span className="navbar-brand ms-2">{name}</span>

			<button className="btn btn-light ms-auto" onClick={toggleTrueFalse}>
				<i className="fas fa-globe"></i>
				<span>{isToggled}</span>
			</button>

			<button
				className="btn btn-danger ms-2 me-2"
				onClick={logoutHandler}
			>
				<i className="fas fa-sign-out-alt"></i>
				<span> Exit</span>
			</button>
		</div>
	);
};
