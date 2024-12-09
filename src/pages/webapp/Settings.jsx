import React, { Fragment, useEffect, useState } from 'react';
import WebAppLayout from '../../layouts/WebAppLayout';
import { Button } from 'primereact/button';
import Axios from '../../components/Axios';
import { useServiceContext } from '../../context/ContextProvider';
import { TabMenu } from 'primereact/tabmenu';
import { InputTextarea } from "primereact/inputtextarea";
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import ErrorValidation from '../../components/ErrorValidation';
import { FaRegSave } from "react-icons/fa";
import { Skeleton } from 'primereact/skeleton';
import NoData from '../../components/NoData';

const Settings = () => {
    const { showToast } = useServiceContext();
    const { user } = useSelector((state) => state.auth);

    const [settingsActiveIndex, setSettingsActiveIndex] = useState(0);
    const settingsTabMenus = [{ label: 'Blocked Users' },{ label: 'App Feedback' },{ label: 'Privacy Policy' },{ label: 'Terms and Conditions' },{ label: 'Help' }];

    const [blockedUserList, setBlockedUserList] = useState([]);
    const [blockedUserListLoading, setBlockedUserListLoading] = useState(true);
    const getBlockedUserList = async() => {
        if (!user?.id) return;
        setBlockedUserListLoading(true);
        try {
            const { data } = await Axios.get('blocked_user_list', { params: { user_id: user.id } });
            setBlockedUserList(data.data);
            setBlockedUserListLoading(false);
        } catch (error) {
            setBlockedUserListLoading(false);
            console.error('Error fetching blocked user list:', error);
            throw error;
        }
    }

    const [userUnblockLoading, setUserUnblockLoading] = useState(false)
    const unblockUser = async(user_id, friend_user_id) => {
        setUserUnblockLoading(true)
        try {
            const response = await Axios.post('user_unblock', { user_id : user_id, friend_user_id : friend_user_id });
            if(response.data.status === 200){ getBlockedUserList(); showToast('success', response.data.message); }
            setUserUnblockLoading(false);
        } catch (error) { console.log(error); setUserUnblockLoading(false); }
    }

    const tabMenuHandleChange = (e) => {
        setSettingsActiveIndex(e.index);
        e.index === 0 && getBlockedUserList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{ getBlockedUserList(); },[user])
    return (
        <WebAppLayout>
            <section className='p-4 shadow-lg rounded-lg border'>
                <div>
                    <TabMenu className='settings-tab-menus text-lg' model={settingsTabMenus} activeIndex={settingsActiveIndex} onTabChange={tabMenuHandleChange} />
                    <div className='pt-4 w-full'>
                        {settingsActiveIndex === 0 && (
                            <Fragment>
                                {blockedUserListLoading ?
                                    <div className='grid grid-cols-3 gap-2'>
                                        <Skeleton width="100%" height="60px"/>
                                        <Skeleton width="100%" height="60px"/>
                                        <Skeleton width="100%" height="60px"/>
                                    </div>
                                : blockedUserList.length > 0 ? blockedUserList.map((blockedUser, index) => (
                                    <div key={index+1} className='grid grid-cols-3 items-center'>
                                        <div className='border p-2 rounded-lg flex items-center gap-2'>
                                            <p className='px-2 text-base font-semibold'>{index+1}.</p>
                                            <div>
                                                <p><strong>Name</strong> : {blockedUser.first_name} {blockedUser.last_name}</p>
                                                <p><strong>Email-ID</strong> : {blockedUser.email}</p>
                                            </div>
                                            <Button type='button' disabled={userUnblockLoading} loading={userUnblockLoading} onClick={() => unblockUser(user.id, blockedUser.user_id)} className='ml-auto' label={userUnblockLoading ? 'Please wait' : 'Unblock'}/>
                                        </div>
                                    </div>
                                )) : <NoData/> }
                            </Fragment>
                        )}
                        {settingsActiveIndex === 1 && (
                            <Fragment>
                                <Formik
                                    initialValues={{user_id : user ? user.id : null,feedback: ''}}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.feedback) { errors.feedback = 'Enter your feedback'; }
                                        return errors;
                                    }}
                                    onSubmit={ (values, {setSubmitting}) => {
                                        Axios.post('app_feedback', values).then((response) => {
                                            if(response.data.status === 200){ showToast('success', response.data.message); setSubmitting(false); }
                                        }).catch((error) => { console.log(error); setSubmitting(false); });
                                    }}
                                >
                                {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                                    <form onSubmit={handleSubmit}>
                                        <InputTextarea className='w-full' value={values.feedback} onChange={handleChange} onBlur={handleBlur} invalid={(errors.feedback && touched.feedback) ? true : false} name='feedback' rows={5} cols={30} placeholder='Enter app feedback here.....' />
                                        <ErrorValidation errors={errors.feedback} touched={touched}/>
                                        <Button icon={<FaRegSave size={18}/>} type='submit' disabled={isSubmitting} loading={isSubmitting} label={isSubmitting ? 'Please wait' : 'Submit Now'} className={`gap-2 px-10 ${errors && errors.feedback ? 'mt-5' : 'mt-2'}`}/>
                                    </form>
                                )}
                                </Formik>
                            </Fragment>
                        )}
                        {settingsActiveIndex === 2 && <iframe title='Privacy Policy' src='https://admin.dyscore.prometteur.in/privacy-and-policy' className='w-full' style={{ height : 'calc(100vh - 200px)' }}/>}
                        {settingsActiveIndex === 3 && <iframe title='Terms and Conditions' src='https://admin.dyscore.prometteur.in/terms-and-conditions' className='w-full' style={{ height : 'calc(100vh - 200px)' }}/>}
                        {settingsActiveIndex === 4 && <p>Coming Soon.....</p>}
                    </div>
                </div>
            </section>
        </WebAppLayout>
    )
}

export default Settings