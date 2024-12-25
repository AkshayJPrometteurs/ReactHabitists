import React from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WebSidebar from '../components/WebSidebar';

const MobileSidebar = ({ sidebarToggle, setSidebarToggle }) => {
    return (
        <Drawer anchor="left" open={sidebarToggle} onClose={() => setSidebarToggle(false)} PaperProps={{ sx: { width: '16rem' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <img alt="logo" src="assets/images/landing-header-image.svg" style={{ height: '32px' }} />
                <IconButton onClick={() => setSidebarToggle(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <WebSidebar headerClass="hidden" />
        </Drawer>
    );
};

export default MobileSidebar;
