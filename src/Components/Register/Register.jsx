import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  let validationSchema = Yup.object({
    name: Yup.string()
      .required('name is required')
      .min(3, 'min length is 3')
      .max(10, 'max length is 10'),
    email: Yup.string()
      .required('email is required')
      .email('email is invalid'),
    password: Yup.string()
      .required('password is required')
      .matches(/^[A-Z][\w @]{5,8}$/, 'password start with capital character ex Ahmed@123'),
    rePassword: Yup.string()
      .required('rePassword is required')
      .oneOf([Yup.ref('password')], 'password and rePassword do not match'),
    phone: Yup.string()
      .required('phone is required')
      .matches(/^01[1250][0-9]{8}$/, 'Enter Egyptian phone number')
  });

  async function registerSubmit(values) {
    setLoading(true);
    setErr('');

    try {
      let { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );

      if (data.message === 'success') {
        setLoading(false);
        navigate('/login');
      }
    } catch (err) {
      setErr(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: registerSubmit
  });

  return <>
    <div className="w-75 mx-auto py-4">

      <h2>Register Now</h2>

      <form onSubmit={formik.handleSubmit}>
        {err ? <div className="alert alert-danger py-2">{err}</div> : null}

        <label htmlFor="name">Name :</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          id="name"
          name="name"
          className="form-control mb-2"
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="alert alert-danger py-2">{formik.errors.name}</div>
        ) : null}

        <label htmlFor="email">Email :</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
          id="email"
          name="email"
          className="form-control mb-2"
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger py-2">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password :</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          id="password"
          name="password"
          className="form-control mb-2"
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="alert alert-danger py-2">{formik.errors.password}</div>
        ) : null}

        <label htmlFor="rePassword">rePassword :</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          id="rePassword"
          name="rePassword"
          className="form-control mb-2"
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div className="alert alert-danger py-2">{formik.errors.rePassword}</div>
        ) : null}

        <label htmlFor="phone">Phone :</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="tel"
          id="phone"
          name="phone"
          className="form-control mb-2"
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="alert alert-danger py-2">{formik.errors.phone}</div>
        ) : null}

        {loading ? (
          <button type="button" className="btn bg-main text-light">
            <BallTriangle
              height={25}
              width={25}
              radius={5}
              color="#fff"
              ariaLabel="ball-triangle-loading"
              visible={true}
            />
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-light"
          >
            Register
          </button>
        )}
        <Link className='ps-3' to={'/login'}>Login Now</Link>
        
      </form>
    </div>
  </>
}