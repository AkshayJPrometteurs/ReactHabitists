import React, { Fragment, useEffect, useState } from 'react';
import { Drawer, Typography, Divider, Button, CircularProgress, Box } from '@mui/material';
import { FaCalendarCheck } from "react-icons/fa6";
import Axios from './Axios';
import { useSelector } from 'react-redux';
import NoData from './NoData';

const NotificationPanel = ({ notificationSidebarToggle, setNotificationSidebarToggle }) => {
    const { user } = useSelector((state) => state.auth);
    const [notifications, setNotifications] = useState([]);
    const [notificationsLoading, setNotificationsLoading] = useState(true);

    const getNotificationsData = async () => {
        try {
            const response = await Axios.get('/notification_list', { params: { user_id: user.id } });
            setNotifications(response.data.data.notifications);
            setNotificationsLoading(false);
        } catch (error) {
            console.log(error);
            setNotificationsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            getNotificationsData();
        }
    }, [user]);

    return (
        <Drawer
            anchor="right"
            open={notificationSidebarToggle}
            onClose={() => setNotificationSidebarToggle(false)}
            PaperProps={{
                sx: { width: '24rem' }
            }}
        >
            <Box p={2}>
                <Typography variant="h6" fontWeight="bold">
                    Notifications
                </Typography>
            </Box>
            <Divider />

            <Box p={2} overflow="auto" flex={1}>
                {notificationsLoading ? (
                    <Fragment>
                        {[...Array(5)].map((_, index) => (
                            <Box key={index} mb={2} display="flex" flexDirection="column" gap={2}>
                                <CircularProgress size={24} />
                                <Divider />
                            </Box>
                        ))}
                    </Fragment>
                ) : notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <Box
                            key={notification.id}
                            border={1}
                            borderColor="grey.300"
                            borderRadius={2}
                            p={2}
                            mb={2}
                            boxShadow={1}
                        >
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <FaCalendarCheck size={18} style={{ color: '#3f51b5' }} />
                                <Typography variant="body1" fontWeight="bold">
                                    {notification?.task_title || notification?.title || 'Notification'}
                                </Typography>
                            </Box>
                            <Divider />
                            <Typography variant="body2" mt={1} mb={2}>
                                {notification?.task_desc || notification?.description}
                            </Typography>
                            <Divider />
                            {notification?.notification_type === 'member_add' &&
                                notification?.notification_status === 'requested' && (
                                    <Box display="flex" justifyContent="center" gap={2} mt={2}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="success"
                                            sx={{ fontSize: '0.75rem' }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="error"
                                            sx={{ fontSize: '0.75rem' }}
                                        >
                                            Reject
                                        </Button>
                                    </Box>
                                )}
                            <Typography
                                variant="caption"
                                display="block"
                                color="textSecondary"
                                align="center"
                                mt={2}
                            >
                                {notification?.task_time || notification?.date_time || 'Time not available'}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <NoData />
                )}
            </Box>
        </Drawer>
    );
};

export default NotificationPanel;
