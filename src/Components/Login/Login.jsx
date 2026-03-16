import React, { useContext, useState } from 'react';
import style from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    let {setUserToken} = useContext(UserContext);
  
    let validationSchema = Yup.object({
      email: Yup.string()
        .required('email is required')
        .email('email is invalid'),
      password: Yup.string()
        .required('password is required')
        .matches(/^[A-Z][\w @]{5,8}$/, 'password start with capital character ex Ahmed@123'),
    });
  
    async function loginSubmit(values) {
      setLoading(true);
      setErr('');
  
      try {
        let { data } = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/signin',
          values
        );
  
        if (data.message === 'success') {
          setLoading(false);
          localStorage.setItem('userToken' , data.token);
          setUserToken(data.token);
          navigate('/');
        }
      } catch (err) {
        setErr(err.response?.data?.message || 'Something went wrong');
        setLoading(false);
      }
    }
  
    let formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema,
      onSubmit: loginSubmit
    });
  
    return <>
      <div className="w-75 mx-auto py-4">

        <h2>Login Now</h2>

        <form onSubmit={formik.handleSubmit}>
          {err ? <div className="alert alert-danger py-2">{err}</div> : null}
  
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
              login
            </button>
          )}
          <Link className='ps-3' to={'/register'}>Register Now</Link>
        </form>
      </div>
    </>
}
