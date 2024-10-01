import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { postData } from '../../../components/AxiosActions';

const SignUp = () => {
    document.title = process.env.REACT_APP_NAME+' : Sign Up';
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [termsAndCondtions, setTermsAndConditions] = useState('');
    const genderOptions = [{ name: 'Male', code: 'male' },{ name: 'Female', code: 'female' },{ name: 'Other', code: 'other' }];
    const navigate = useNavigate();
    const [error, setError] = useState([]);
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 md:h-screen'>
            <div className='flex flex-col justify-center p-3 md:p-5 bg-[#E8EFEF]'>
                <img src="assets/images/landing-header-image.svg" alt="logo" className='w-auto h-10' />
                <img src="assets/images/signin.png" alt="logo" className='max-w-md m-auto hidden md:block' />
            </div>
            <div className='flex flex-col'>
                <div className='md:w-2/3 m-auto'>
                    <h1 className='font-bold text-2xl my-2'>Sign Up</h1>
                    <p className='mb-6 text-gray-400'>Please enter your details below to continue</p>
                    <Formik
                        initialValues={{first_name: '', last_name: '',gender: '', age:'', email: '', password: '',confirm_password: '',terms_and_privacy_policy:''}}
                        validate={values => {
                            setGender(values.gender)
                            setPassword(values.password)
                            setTermsAndConditions(values.terms_and_privacy_policy)
                            const errors = {};
                            if (!values.first_name) { errors.first_name = 'Enter first name'; }
                            if (!values.last_name) { errors.last_name = 'Enter last name'; }
                            if (!values.email) { errors.email = 'Enter email address';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { errors.email = 'Invalid email address'; }
                            if (!values.password) { errors.password = 'Enter password';
                            }else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(values.password)){ errors.password = 'Password must be 8 characters, contain min. 1 uppercase, lowercase, digit, special character.'; }
                            if (!values.confirm_password) { errors.confirm_password = 'Enter confirm password';
                            }else if(!values.confirm_password.match(values.password)){ errors.confirm_password = 'Password does not match.' }
                            if (!values.terms_and_privacy_policy) { errors.terms_and_privacy_policy = 'Please accept the terms and privacy policy';}
                            return errors;
                        }}
                        onSubmit={ async(values, { setSubmitting }) => {
                            const formData = new FormData();
                            formData.append('auth_type','manual');
                            formData.append('first_name',values.first_name);
                            formData.append('last_name',values.last_name);
                            formData.append('email',values.email);
                            formData.append('gender',values.gender.code);
                            formData.append('age',values.age);
                            formData.append('password',values.password);
                            formData.append('terms_policy_status',values.terms_and_privacy_policy);
                            formData.append('splash_que_ans',localStorage.getItem('splashQues'));
                            try{
                                const response = await postData('/register',formData);
                                localStorage.setItem('ACCESS_TOKEN',response.data.data.token);
                                navigate('/dashboard')
                            }catch (error){
                                setError(error)
                            } finally{
                                setSubmitting(false);
                            }
                        }}
                    >
                    {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
                                <div className='mb-1'>
                                    <InputText placeholder='First Name' className='w-full' invalid={errors.first_name ? true : false} name='first_name' keyfilter={/^[a-zA-Z ]*$/} onChange={handleChange} onBlur={handleBlur} value={values.first_name} />
                                    <p className='text-[#dc3545] text-sm'>{errors.first_name && touched.first_name && errors.first_name}</p>
                                </div>
                                <div className='mb-1'>
                                    <InputText placeholder='Last Name' className='w-full' invalid={errors.last_name ? true : false} name='last_name' keyfilter={/^[a-zA-Z ]*$/} onChange={handleChange} onBlur={handleBlur} value={values.last_name} />
                                    <p className='text-[#dc3545] text-sm'>{errors.last_name && touched.last_name && errors.last_name}</p>
                                </div>
                            </div>
                            <div className='mb-5'>
                                <InputText placeholder='Email Address' className='w-full' invalid={(error && error.email) || errors.email ? true : false} name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                <p className='text-[#dc3545] text-sm'>{errors.email && touched.email && errors.email}</p>
                                {(error && error.email) && <p className='text-[#dc3545] text-sm'>{error.email}</p> }
                            </div>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
                                <div className='mb-1'>
                                    <Dropdown value={gender} name='gender' onChange={handleChange} onBlur={handleBlur} options={genderOptions} optionLabel="name" placeholder="Choose Gender" className="w-full" />
                                </div>
                                <div className='mb-1'>
                                    <InputNumber placeholder='Age' name='age' onValueChange={handleChange}  onBlur={handleBlur} mode="decimal" showButtons min={0} max={70} className='w-full' />
                                </div>
                            </div>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
                                <div className='mb-1'>
                                    <Password value={password} name='password' className='login-password w-full' inputClassName='w-full' invalid={errors.password ? true : false} onChange={handleChange} onBlur={handleBlur} toggleMask />
                                    <p className='text-[#dc3545] text-sm'>{errors.password && touched.password && errors.password}</p>
                                </div>
                                <div className='mb-1'>
                                    <Password name='confirm_password' className='login-password w-full' inputClassName='w-full' invalid={errors.confirm_password ? true : false} onChange={handleChange} onBlur={handleBlur} toggleMask feedback={false} />
                                    <p className='text-[#dc3545] text-sm'>{errors.confirm_password && touched.confirm_password && errors.confirm_password}</p>
                                </div>
                            </div>
                            <div className='mb-5'>
                                <div className="flex align-items-center">
                                    <Checkbox onChange={handleChange} id='terms_and_privacy_policy' name='terms_and_privacy_policy' checked={termsAndCondtions} />
                                    <label style={{ marginTop: '1px' }} htmlFor="terms_and_privacy_policy" className="ml-2">I agree to all Terms & <Link className='text-[#18605D] font-bold' target='_blank' to={'https://admin.lakshyatheapp.com/privacy-and-policy'}>Privacy Policy</Link></label>
                                </div>
                                <p className='text-[#dc3545] text-sm'>{errors.terms_and_privacy_policy && touched.terms_and_privacy_policy && errors.terms_and_privacy_policy}</p>
                            </div>
                            <Button type='submit' disabled={isSubmitting} className='bg-black rounded-xl w-full py-2.5 mt-8 flex justify-center gap-2 items-center border-0'>Sign Up</Button>
                        </form>
                    )}
                    </Formik>
                </div>
                <p className='p-4 text-center'>Already have an account? <Link className='text-[#18676C] font-bold' to={'/login'}>Login</Link></p>
            </div>
        </section>
    )
}

export default SignUp