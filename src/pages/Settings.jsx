import React, { Fragment, useEffect, useState } from 'react';
import WebAppLayout from '../layouts/WebAppLayout';
import { Button, Tabs, Tab, TextField, CircularProgress, Box, Typography, Skeleton as MuiSkeleton } from '@mui/material';
import Axios from '../components/Axios';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import ErrorValidation from '../components/ErrorValidation';
import { FaRegSave } from "react-icons/fa";
import NoData from '../components/NoData';
import { toast } from 'react-toastify';

const Settings = () => {
    const { user } = useSelector((state) => state.auth);
    const [settingsActiveIndex, setSettingsActiveIndex] = useState(0);
    const settingsTabMenus = ['Blocked Users', 'App Feedback', 'Privacy Policy', 'Terms and Conditions', 'Help'];
    const [blockedUserList, setBlockedUserList] = useState([]);
    const [blockedUserListLoading, setBlockedUserListLoading] = useState(true);

    const getBlockedUserList = async () => {
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
    };

    const [userUnblockLoading, setUserUnblockLoading] = useState(false);
    const unblockUser = async (user_id, friend_user_id) => {
        setUserUnblockLoading(true);
        try {
            const response = await Axios.post('user_unblock', { user_id, friend_user_id });
            if (response.data.status === 200) {
                getBlockedUserList();
                toast.success(response.data.message, { closeButton: false, draggable: false, autoClose: 3000 });
            }
            setUserUnblockLoading(false);
        } catch (error) {
            console.log(error);
            setUserUnblockLoading(false);
        }
    };

    const tabMenuHandleChange = (event, newValue) => {
        setSettingsActiveIndex(newValue);
        if (newValue === 0) getBlockedUserList();
    };

    useEffect(() => {
        getBlockedUserList();
    }, [user]);

    return (
        <WebAppLayout pageTitle={'Settings'}>
            <Box className="p-4 shadow-lg rounded-lg border">
                <Tabs
                    value={settingsActiveIndex}
                    onChange={tabMenuHandleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    className="settings-tab-menus text-lg"
                >
                    {settingsTabMenus.map((menu, index) => (
                        <Tab label={menu} key={index} />
                    ))}
                </Tabs>
                <Box className="pt-4 w-full">
                    {settingsActiveIndex === 0 && (
                        <Fragment>
                            {blockedUserListLoading ? (
                                <Box className="grid grid-cols-3 gap-2">
                                    <MuiSkeleton variant="rectangular" width="100%" height="60px" />
                                    <MuiSkeleton variant="rectangular" width="100%" height="60px" />
                                    <MuiSkeleton variant="rectangular" width="100%" height="60px" />
                                </Box>
                            ) : blockedUserList.length > 0 ? (
                                blockedUserList.map((blockedUser, index) => (
                                    <Box
                                        key={index + 1}
                                        className="grid grid-cols-3 items-center border p-2 rounded-lg"
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                    >
                                        <Typography className="px-2 text-base font-semibold">{index + 1}.</Typography>
                                        <Box>
                                            <Typography>
                                                <strong>Name</strong>: {blockedUser.first_name} {blockedUser.last_name}
                                            </Typography>
                                            <Typography>
                                                <strong>Email-ID</strong>: {blockedUser.email}
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={userUnblockLoading}
                                            onClick={() => unblockUser(user.id, blockedUser.user_id)}
                                        >
                                            {userUnblockLoading ? (
                                                <CircularProgress size={20} color="inherit" />
                                            ) : (
                                                'Unblock'
                                            )}
                                        </Button>
                                    </Box>
                                ))
                            ) : (
                                <NoData />
                            )}
                        </Fragment>
                    )}
                    {settingsActiveIndex === 1 && (
                        <Fragment>
                            <Formik
                                initialValues={{ user_id: user ? user.id : null, feedback: '' }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.feedback) {
                                        errors.feedback = 'Enter your feedback';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    Axios.post('app_feedback', values)
                                        .then((response) => {
                                            if (response.data.status === 200) {
                                                toast.success(response.data.message, {
                                                    closeButton: false,
                                                    draggable: false,
                                                    autoClose: 3000,
                                                });
                                                setSubmitting(false);
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            setSubmitting(false);
                                        });
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={5}
                                            value={values.feedback}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="feedback"
                                            error={errors.feedback && touched.feedback}
                                            helperText={touched.feedback && errors.feedback}
                                            placeholder="Enter app feedback here....."
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            startIcon={<FaRegSave size={18} />}
                                            disabled={isSubmitting}
                                            className="mt-2"
                                        >
                                            {isSubmitting ? 'Please wait' : 'Submit Now'}
                                        </Button>
                                    </form>
                                )}
                            </Formik>
                        </Fragment>
                    )}
                    {settingsActiveIndex === 2 && (
                        <iframe
                            title="Privacy Policy"
                            src="https://admin.dyscore.prometteur.in/privacy-and-policy"
                            style={{ width: '100%', height: 'calc(100vh - 200px)' }}
                        />
                    )}
                    {settingsActiveIndex === 3 && (
                        <iframe
                            title="Terms and Conditions"
                            src="https://admin.dyscore.prometteur.in/terms-and-conditions"
                            style={{ width: '100%', height: 'calc(100vh - 200px)' }}
                        />
                    )}
                    {settingsActiveIndex === 4 && <Typography>Coming Soon.....</Typography>}
                </Box>
            </Box>
        </WebAppLayout>
    );
};

export default Settings;
