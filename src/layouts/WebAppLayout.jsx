import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Typography, Drawer } from '@mui/material';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WebSidebar from '../components/WebSidebar';
import MobileSidebar from '../components/MobileSidebar';
import NotificationPanel from '../components/NotificationPanel';
import Modal from '../components/Modal';
import { BsPatchExclamationFill } from 'react-icons/bs';
import Axios from '../components/Axios';

const WebAppLayout = ({ children, pageTitle }) => {
    document.title = process.env.REACT_APP_NAME + ': ' + pageTitle;
    const { token, user } = useSelector((state) => state.auth);
    const [notificationSidebarToggle, setNotificationSidebarToggle] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [signOutModal, setSignOutModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const signOut = async () => {
        setLoading(true);
        try {
            const response = await Axios.post('/logout');
            setLoading(false);
            if (response.data.status === 200) {
                localStorage.clear();
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token && !user) {
            navigate('/sign-in');
        }
    }, [navigate, token, user]);

    return (
        <section className="flex flex-row">
            {/* Web Sidebar */}
            <WebSidebar classes="w-[17%] hidden md:block p-4 pt-2 shadow-md bg-gray-200" headerClass="block" />

            {/* Main Content */}
            <main className="w-full">
                {/* Top Bar */}
                <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', boxShadow: 1 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        {/* Start: Logo and Hamburger */}
                        <Box display="flex" alignItems="center" gap={2}>
                            <IconButton onClick={() => setSidebarToggle(true)} size="large">
                                <GiHamburgerMenu className="text-primaryColor" size={23} />
                            </IconButton>
                            <Box component="img" src="assets/images/landing-header-image.svg" alt="logo" sx={{ height: 40 }} />
                        </Box>

                        {/* End: Buttons */}
                        <Box display="flex" alignItems="center" gap={2}>
                            <Button
                                onClick={() => setNotificationSidebarToggle(true)}
                                variant="contained"
                                color="primary"
                                startIcon={<i className="pi pi-bell" />}
                                sx={{ textTransform: 'none' }}
                            >
                                Notifications
                            </Button>
                            <Button
                                onClick={() => setSignOutModal(true)}
                                variant="contained"
                                color="error"
                                startIcon={<i className="pi pi-power-off" />}
                                sx={{ textTransform: 'none' }}
                            >
                                Sign Out
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Content Section */}
                <div className="p-5 overflow-y-auto app-menus-height">{children}</div>
            </main>

            {/* Mobile Sidebar */}
            <Drawer anchor="left" open={sidebarToggle} onClose={() => setSidebarToggle(false)}>
                <MobileSidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            </Drawer>

            {/* Notification Panel */}
            <Drawer anchor="right" open={notificationSidebarToggle} onClose={() => setNotificationSidebarToggle(false)}>
                <NotificationPanel
                    notificationSidebarToggle={notificationSidebarToggle}
                    setNotificationSidebarToggle={setNotificationSidebarToggle}
                />
            </Drawer>

            {/* Sign Out Modal */}
            <Modal header="Confirmation" closable={false} headerClassName="text-center" visible={signOutModal}>
                <div className="flex gap-2 items-center mb-9 mt-2">
                    <BsPatchExclamationFill size={25} />
                    <Typography variant="body1">Are you sure you want to logout now?</Typography>
                </div>
                {loading ? (
                    <Button variant="contained" color="secondary" disabled>
                        Please wait...
                    </Button>
                ) : (
                    <Box display="flex" gap={2}>
                        <Button variant="outlined" onClick={() => setSignOutModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="error" onClick={signOut}>
                            Yes, Sign Out
                        </Button>
                    </Box>
                )}
            </Modal>
        </section>
    );
};

export default WebAppLayout;
