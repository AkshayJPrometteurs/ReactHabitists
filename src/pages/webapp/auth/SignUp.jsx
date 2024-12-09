import { Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../redux/slices/authSlice';
import GuestLayout from '../../../layouts/GuestLayout';
import ErrorValidation from '../../../components/ErrorValidation';

const SignUp = () => {
    const genderOptions = [{ name: 'Male', code: 'male' },{ name: 'Female', code: 'female' },{ name: 'Other', code: 'other' }];
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);
    return (
        <GuestLayout leftPanelImgURL="assets/images/signup.svg" pageTitle="Sign Up">
            <div className='md:w-2/3 m-auto'>
                <h1 className='font-bold text-2xl my-4 md:my-2 text-center md:text-start'>Sign Up</h1>
                <p className='mb-6 text-gray-400'>Please enter your details below to continue</p>
                <Formik
                    initialValues={{first_name: '', last_name: '',genderCustomize : '',gender: '', age:'', email: '', password: '',confirm_password: '',terms_policy_status:''}}
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
                        const formData = {...values, auth_type :'manual', gender : values.genderCustomize.code, splash_que_ans : localStorage.getItem('splashQues')};
                        dispatch(signup(formData));
                    }}
                >
                {({values,errors,touched,handleChange,handleBlur,handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
                            <div className='mb-1'>
                                <InputText placeholder='First Name' className='w-full' invalid={(errors.first_name && touched.first_name) ? true : false} name='first_name' keyfilter={/^[a-zA-Z ]*$/} onChange={handleChange} onBlur={handleBlur} value={values.first_name} />
                                <ErrorValidation touched={touched.first_name} errors={errors.first_name} />
                            </div>
                            <div className='mb-1'>
                                <InputText placeholder='Last Name' className='w-full' invalid={(errors.last_name && touched.last_name) ? true : false} name='last_name' keyfilter={/^[a-zA-Z ]*$/} onChange={handleChange} onBlur={handleBlur} value={values.last_name} />
                                <ErrorValidation touched={touched.last_name} errors={errors.last_name} />
                            </div>
                        </div>
                        <div className='mb-5'>
                            <InputText placeholder='Email Address' className='w-full' invalid={((errors.email && touched.email) || (error && error.email)) ? true : false} name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorValidation touched={touched.email} errors={errors.email} error={error && error.email} />
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
                            <div className='mb-1'>
                                <Dropdown value={values.genderCustomize} name='genderCustomize' onChange={handleChange} onBlur={handleBlur} options={genderOptions} optionLabel="name" placeholder="Choose Gender" className="w-full" />
                            </div>
                            <div className='mb-1'>
                                <InputNumber placeholder='Age' name='age' onValueChange={handleChange}  onBlur={handleBlur} mode="decimal" showButtons min={0} max={70} className='w-full' />
                            </div>
                            <div className='mb-1'>
                                <Password value={values.password} name='password' className='login-password w-full' inputClassName='w-full' invalid={(errors.password && touched.password) ? true : false} onChange={handleChange} onBlur={handleBlur} toggleMask placeholder='Password' />
                                <ErrorValidation touched={touched.password} errors={errors.password} />
                            </div>
                            <div className='mb-1'>
                                <Password name='confirm_password' className='login-password w-full' inputClassName='w-full' invalid={(errors.confirm_password && touched.confirm_password) ? true : false} onChange={handleChange} onBlur={handleBlur} toggleMask feedback={false} placeholder='Confirm Password' />
                                <ErrorValidation touched={touched.confirm_password} errors={errors.confirm_password} />
                            </div>
                        </div>
                        <div className='mb-5'>
                            <div className="flex align-items-center">
                                <Checkbox invalid={touched.terms_policy_status && errors.terms_policy_status ? true : false} onChange={handleChange} id='terms_policy_status' name='terms_policy_status' checked={values.terms_policy_status} />
                                <label style={{ marginTop: '1px' }} htmlFor="terms_policy_status" className="ml-2">I agree to all Terms & <Link className='text-primaryColor font-bold' target='_blank' to={'https://admin.lakshyatheapp.com/privacy-and-policy'}>Privacy Policy</Link></label>
                            </div>
                            <ErrorValidation touched={touched.terms_policy_status} errors={errors.terms_policy_status} />
                        </div>
                        <Button type='submit' disabled={loading} loading={loading} className='bg-black rounded-xl w-full py-2.5 mt-8 flex justify-center gap-2 items-center border-0'>{loading ? 'Please wait...' : 'Sign Up'}</Button>
                    </form>
                )}
                </Formik>
            </div>
            <p className='p-4 text-center'>Already have an account? <Link className='text-primaryColor font-bold' to={'/sign-in'}>Sign-In</Link></p>
        </GuestLayout>
    )
}

export default SignUp