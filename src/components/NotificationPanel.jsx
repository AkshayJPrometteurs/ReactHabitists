import React, { Fragment, useEffect, useState } from 'react'
import { Sidebar } from 'primereact/sidebar';
import Axios from './Axios';
import { useSelector } from 'react-redux';
import { FaCalendarCheck } from "react-icons/fa6";
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

const NotificationPanel = ({notificationSidebarToggle, setNotificationSidebarToggle}) => {
    const { user } = useSelector((state) => state.auth);
    const [notifications, setNotifications] = useState([]);
    const getNotificationsData = async() => {
        try{
            const response = await Axios.get('/notification_list',{ params : { user_id : user.id } });
            setNotifications(response.data.data.notifications)
        }catch(error){ console.log(error); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getNotificationsData(); },[user])
    return (
        <Sidebar className='w-96' header={<h1 className='font-bold text-lg'>Notifications</h1>} visible={notificationSidebarToggle} position="right" onHide={() => setNotificationSidebarToggle(false)}>
            {notifications.map((notification) => {
                return(
                    <Fragment key={notification.id}>
                        {notification?.notification_type === 'task_of_the_day' && notification?.task_desc && (
                            <div className='border-gray-200 border-[1px] shadow-md rounded-md p-3 mb-3'>
                                <div className='flex gap-3'>
                                    <FaCalendarCheck size={18} className='text-primaryColor' />
                                    <p className='uppercase font-semibold'>{notification?.task_title}</p>
                                </div>
                                <Divider/>
                                <p>{notification?.task_desc}</p>
                                <Divider className='mb-2'/>
                                <p className='text-xs text-gray-500 text-center'>{notification?.task_time}</p>
                            </div>
                        )}
                        {notification?.notification_type === 'challenge' && notification?.task_desc && (
                            <div className='border-gray-200 border-[1px] shadow-md rounded-md p-3 mb-3'>
                                <div className='flex gap-3'>
                                    <FaCalendarCheck size={18} className='text-primaryColor' />
                                    <p className='uppercase font-semibold'>Challenge</p>
                                </div>
                                <Divider/>
                                <p>{notification?.task_desc}</p>
                                <Divider className='mb-2'/>
                                <p className='text-xs text-gray-500 text-center'>{notification?.task_time}</p>
                            </div>
                        )}
                        {notification?.notification_type === 'member_add' && notification?.notification_status === 'accepted' && notification?.description && (
                            <div className='border-gray-200 border-[1px] shadow-md rounded-md p-3 mb-3'>
                                <div className='flex gap-3'>
                                    <FaCalendarCheck size={18} className='text-primaryColor' />
                                    <p className='uppercase font-semibold'>{notification?.title}</p>
                                </div>
                                <Divider/>
                                <p>{notification?.description}</p>
                                <Divider className='mb-2'/>
                                <p className='text-xs text-gray-500 text-center'>{notification?.date_time}</p>
                            </div>
                        )}
                        {notification?.notification_type === 'member_add' && notification?.notification_status === 'rejected' && notification?.description && (
                            <div className='border-gray-200 border-[1px] shadow-md rounded-md p-3 mb-3'>
                                <div className='flex gap-3'>
                                    <FaCalendarCheck size={18} className='text-primaryColor' />
                                    <p className='uppercase font-semibold'>{notification?.title}</p>
                                </div>
                                <Divider/>
                                <p>{notification?.description}</p>
                                <Divider className='mb-2'/>
                                <p className='text-xs text-gray-500 text-center'>{notification?.date_time}</p>
                            </div>
                        )}
                        {notification?.notification_type === 'member_add' && notification?.notification_status === 'requested' && notification?.description && (
                            <div className='border-gray-200 border-[1px] shadow-md rounded-md p-3 mb-3'>
                                <div className='flex gap-3'>
                                    <FaCalendarCheck size={18} className='text-primaryColor' />
                                    <p className='uppercase font-semibold'>{notification?.title}</p>
                                </div>
                                <Divider/>
                                <p>{notification?.description}</p>
                                <div className='flex justify-center items-center gap-4 mt-3'>
                                    <Button label='Accept' severity='success' className='bg-primaryColor text-xs border-primaryColor px-2 py-1.5'/>
                                    <Button label='Reject' severity='danger' className='px-2 py-1.5 text-xs'/>
                                </div>
                                <Divider className='mb-2'/>
                                <p className='text-xs text-gray-500 text-center'>{notification?.date_time}</p>
                            </div>
                        )}
                    </Fragment>
                )})
            }
        </Sidebar>
    )
}

export default NotificationPanel