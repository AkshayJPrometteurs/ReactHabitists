import { Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/slices/authSlice';
import GuestLayout from '../../layouts/GuestLayout';
import { Alert, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignIn = () => {
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => { setShowPassword((prev) => !prev); };
    return (
        <GuestLayout leftPanelImgURL="assets/images/signin.svg" pageTitle="Sign In">
            <div className='md:w-2/3 m-auto'>
                <h1 className='font-bold text-2xl my-4 md:my-2 text-center md:text-start'>Sign In</h1>
                <p className='mb-6 text-gray-400'>Please enter your details below to continue</p>
                {error && <Alert className='mb-6' severity="error">{error}</Alert>}
                <Formik initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) { errors.email = 'Enter email address';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { errors.email = 'Invalid email address'; }
                        if (!values.password) { errors.password = 'Enter password'; }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        const formData = {...values, auth_type :'manual'};
                        dispatch(signin(formData))
                    }}
                >
                {({values,errors,touched,handleChange,handleBlur,handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <TextField label="Email Address" variant="outlined" error={errors.email && touched.email ? true : false} name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} fullWidth/>
                        </div>
                        <div className='mb-5'>
                            <TextField label="Password" type={showPassword ? 'text' : 'password'} variant="outlined" value={values.password} name='password' className='login-password w-full' error={(errors.password && touched.password) ? true : false} onChange={handleChange} onBlur={handleBlur} fullWidth InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}/>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-4 items-center'>
                            <div className="flex align-items-center">
                                <FormControlLabel onChange={handleChange} control={<Checkbox id='always_logged_in' name='always_logged_in' />} label="Always Logged In" />
                            </div>
                            <Link className='font-bold p-0 text-end'>Forget Password</Link>
                        </div>
                        <Button size='large' variant="contained" type='submit' disabled={loading} className='bg-black rounded-xl w-full py-2.5 mt-8 flex justify-center gap-2 items-center border-0'>
                            {loading ? (
                                <Fragment>
                                    <CircularProgress size={24} color="inherit" />
                                    <p>Please wait...</p>
                                </Fragment>
                            ) : 'Sign In'}
                        </Button>
                    </form>
                )}
                </Formik>
            </div>
            <p className='p-4 text-center'>Don’t have an account? <Link className='text-primaryColor font-bold' to={'/splash-screen'}>Sign-Up</Link></p>
        </GuestLayout>
    )
}

export default SignIn