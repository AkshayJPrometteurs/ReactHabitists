import { Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/slices/authSlice';
import { Checkbox } from 'primereact/checkbox';
import { Message } from 'primereact/message';
import GuestLayout from '../../layouts/GuestLayout';
import ErrorValidation from '../../components/ErrorValidation';

const SignIn = () => {
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);
    return (
        <GuestLayout leftPanelImgURL="assets/images/signin.svg" pageTitle="Sign In">
            <div className='md:w-2/3 m-auto'>
                <h1 className='font-bold text-2xl my-4 md:my-2 text-center md:text-start'>Sign In</h1>
                <p className='mb-6 text-gray-400'>Please enter your details below to continue</p>
                {error && <Message className='w-full justify-start mb-4' severity="error" text={error} />}
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) { errors.email = 'Enter email address';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { errors.email = 'Invalid email address'; }
                        if (!values.password) { errors.password = 'Enter password'; }
                        return errors;
                    }}
                    onSubmit={ (values) => {
                        const formData = {...values, auth_type :'manual'};
                        dispatch(signin(formData))
                    }}
                >
                {({values,errors,touched,handleChange,handleBlur,handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <InputText placeholder='Email Address' className='w-full' invalid={errors.email && touched.email ? true : false} name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorValidation touched={touched.email} errors={errors.email} />
                        </div>
                        <div className='mb-5'>
                            <Password value={values.password} name='password' className='login-password w-full' inputClassName='w-full' invalid={(errors.password && touched.password) ? true : false} onChange={handleChange} onBlur={handleBlur} placeholder='Password' toggleMask feedback={false} />
                            <ErrorValidation touched={touched.password} errors={errors.password} />
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
                            <div className="flex align-items-center">
                                <Checkbox onChange={handleChange} id='always_logged_in' name='always_logged_in' checked={values.always_logged_in} />
                                <label style={{ marginTop: '1px' }} htmlFor="always_logged_in" className="ml-2">Always Logged In</label>
                            </div>
                            <Link className='font-bold p-0 text-end'>Forget Password</Link>
                        </div>
                        <Button type='submit' disabled={loading} loading={loading} className='bg-black rounded-xl w-full py-2.5 mt-8 flex justify-center gap-2 items-center border-0'>{loading ? 'Please wait...' : 'Sign In'}</Button>
                    </form>
                )}
                </Formik>
            </div>
            <p className='p-4 text-center'>Don’t have an account? <Link className='text-primaryColor font-bold' to={'/splash-screen'}>Sign-Up</Link></p>
        </GuestLayout>
    )
}

export default SignIn