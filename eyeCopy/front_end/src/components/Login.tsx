/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../../public/styles/login.css';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

export default function Login() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', values);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                alert("login successfully")
                navigate('/app/dashboard');
            }
        } catch (err: any) {
            console.error('Error:', err);
            setError(err.response?.data?.message || 'Server error, please try again.');
        }
    };

    return (
        <section className="login-page">
            <div className="row">
                <div className="left-side col-6">
                    <img className="logo-img" src="../../public/images/company-logo.png" alt="logo.." />
                </div>
                <div className="right-side col-6">
                    <h2 className="mb-4 font-weight-bold">Log In</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">User email</label>
                                <Field
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>

                            <Link className="forget-password" to="#">Forget Password?</Link>

                            <button type="submit" className="btn btn-primary login-button">
                                Log In
                            </button>
                        </Form>
                    </Formik>

                    <div className="already-have">
                        Don't Have an Account? <Link className="signup-link" to="/auth/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
