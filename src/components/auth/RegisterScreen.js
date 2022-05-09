import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [formRegisterValues, handleRegisterInputChange] = useForm({
		registerName: "Gerry",
		registerEmail: "gerry@outlook.com",
		registerPassword: "",
		registerPassword2: "",
	});

	const { registerName, registerEmail, registerPassword, registerPassword2 } = formRegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();

        

        dispatch(startRegister(registerName, registerEmail, registerPassword, registerPassword2));
    };


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control mt-3"
                                placeholder="Email"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mt-3"
                                placeholder="Password"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={handleRegisterInputChange}                                
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Re-enter password" 
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mt-3 d-flex justify-content-center">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                        <Link   to="/login"
                                className="link mt-3 d-flex justify-content-center"
                                style={ { color: '#fff' } }>
                        Login
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
