/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../../public/styles/SignUp.css';

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  doctor_type: Yup.string().required('Doctor type is required')
});

export default function SignUp() {
  const [error, setError] = useState(null); // For showing backend errors
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', values);

      if (response.status === 201) {
        // Redirect to login page after successful signup
        alert("Registration successfully")
        navigate('/auth/login');
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Server error, please try again.');
    }
  };

  return (
    <section className="signup-page">
      <div className="row">
        <div className="left-side col-6">
          <img className="logo-img" src="../../public/images/company-logo.png" alt="logo.." />
        </div>
        <div className="right-side col-6">
          <h2 className="mb-4 font-weight-bold">Sign Up</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
              doctor_type: 'MD',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="signup-form">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-danger" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-danger" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="doctorType">Doctor Type</label>
                <Field as="select" name="doctor_type" className="form-control" id="doctorType">
                  <option value="MD">MD</option>
                  <option value="OD">OD</option>
                </Field>
                <ErrorMessage name="doctor_type" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
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
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary signup-button">Sign Up</button>
            </Form>
          </Formik>

          <div className="already-have">
            Already Have an Account? <Link className="login-link" to="/auth/login">Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
