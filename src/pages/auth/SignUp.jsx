import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/slices/authSlice';
import GuestLayout from '../../layouts/GuestLayout';
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorValidation from '../../components/ErrorValidation';

const SignUp = () => {
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => { setShowPassword((prev) => !prev); };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleToggleConfirmPasswordVisibility = () => { setShowConfirmPassword((prev) => !prev); };
    return (
        <GuestLayout leftPanelImgURL="assets/images/signup.svg" pageTitle="Sign Up">
            <div className='md:w-2/3 m-auto'>
                <h1 className='font-bold text-2xl my-4 md:my-2 text-center md:text-start'>Sign Up</h1>
                <p className='mb-6 text-gray-400'>Please enter your details below to continue</p>
                <Formik
                    initialValues={{first_name: '', last_name: '',gender: '', age:'', email: '', password: '',confirm_password: '',terms_policy_status:''}}
                    validate={values => {
                        const errors = {};
                        if (!values.first_name) { errors.first_name = 'Enter first name'; }
                        if (!values.last_name) { errors.last_name = 'Enter last name'; }
                        if (!values.email) { errors.email = 'Enter email address';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { errors.email = 'Invalid email address'; }
                        if (!values.password) { errors.password = 'Enter password';
                        }else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(values.password)){ errors.password = 'Password must be 8 characters, contain min. 1 uppercase, lowercase, digit, special character.'; }
                        if (!values.confirm_password) { errors.confirm_password = 'Enter confirm password';
                        }else if(!RegExp(values.password).exec(values.confirm_password)){ errors.confirm_password = 'Password does not match.' }
                        if (!values.terms_policy_status) { errors.terms_policy_status = 'Please accept the terms and privacy policy';}
                        return errors;
                    }}
                    onSubmit={ (values) => {
                        console.log(values);
                        // const formData = {...values, auth_type :'manual', gender : values.genderCustomize.code, splash_que_ans : localStorage.getItem('splashQues')};
                        // dispatch(signup(formData));
                    }}
                >
                {({values,errors,touched,handleChange,handleBlur,handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
                            <div>
                                <TextField variant='outlined' label='First Name' fullWidth error={(errors.first_name && touched.first_name) ? true : false} name='first_name' keyfilter={/^[a-zA-Z ]*$/} onChange={handleChange} onBlur={handleBlur} value={values.first_name} />
                                <ErrorValidation touched={touched.first_name} errors={errors.first_name} />
                            </div>
                            <div>
                                <TextField variant='outlined' label='Last Name' fullWidth error={(errors.last_name && touched.last_name) ? true : false} name='last_name' keyfilter={/^[a-zA-Z ]*$/} onChange={handleChange} onBlur={handleBlur} value={values.last_name} />
                                <ErrorValidation touched={touched.last_name} errors={errors.last_name} />
                            </div>
                        </div>
                        <div className='mb-5'>
                            <TextField variant='outlined' label='Email Address' fullWidth error={((errors.email && touched.email) || (error && error.email)) ? true : false} name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorValidation touched={touched.email} errors={errors.email} error={error?.email} />
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
                            <FormControl fullWidth>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select labelId="gender" id="genderOption" value={values.gender} name='gender' label="Gender" onChange={handleChange} onBlur={handleBlur}>
                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField type='number' label='Age' name='age' onChange={handleChange} onBlur={handleBlur} fullWidth inputProps={{ min : 0, max : 120 }} />
                            <div>
                                <TextField value={values.password} type={showPassword ? 'text' : 'password'} name='password' fullWidth error={(errors.password && touched.password) ? true : false} onChange={handleChange} onBlur={handleBlur} label='Password'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}/>
                                <ErrorValidation touched={touched.password} errors={errors.password} />
                            </div>
                            <div>
                                <TextField name='confirm_password' type={showConfirmPassword ? 'text' : 'password'} fullWidth error={(errors.confirm_password && touched.confirm_password) ? true : false} onChange={handleChange} onBlur={handleBlur} feedback={false} label='Confirm Password'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}/>
                                <ErrorValidation touched={touched.confirm_password} errors={errors.confirm_password} />
                            </div>
                        </div>
                        <FormControlLabel sx={{ mb: 2 }}
                            control={<Checkbox onChange={handleChange} error={Boolean(touched.terms_policy_status && errors.terms_policy_status)} id="terms_policy_status" name="terms_policy_status"/>}
                            label={
                                <>
                                    I agree to all Terms & {' '}
                                    <Link className="text-primaryColor font-bold" target="_blank" to={`${process.env.REACT_APP_BACKEND_URL}privacy-and-policy`}>
                                        Privacy Policy
                                    </Link>
                                </>
                            }
                        />
                        <Button type='submit' disabled={loading} variant='contained' size='large' fullWidth>{loading ? 'Please wait...' : 'Sign Up'}</Button>
                    </form>
                )}
                </Formik>
            </div>
            <p className='p-4 text-center'>Already have an account? <Link className='text-primaryColor font-bold' to={'/sign-in'}>Sign-In</Link></p>
        </GuestLayout>
    )
}

export default SignUp