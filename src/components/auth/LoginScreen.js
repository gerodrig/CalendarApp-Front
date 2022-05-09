import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {
	const dispatch = useDispatch();

	const [formLoginValues, handleLoginInputChange] = useForm({
		loginEmail: "",
		loginPassword: "",
	});

	const { loginEmail, loginPassword } = formLoginValues;	

	const handleLogin = (e) => {
		e.preventDefault();

		dispatch(startLogin(loginEmail, loginPassword));
	};

	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Login</h3>
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Email"
								name="loginEmail"
								value={loginEmail}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className="form-group mt-3">
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								name="loginPassword"
								value={loginPassword}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className="form-group mt-3 d-flex justify-content-center">
							<input
								type="submit"
								className="btnSubmit"
								value="Login"
							/>
						</div>
						<Link
							to="/register"
							className="link mt-3 d-flex justify-content-center"
						>
							Create new account
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};
