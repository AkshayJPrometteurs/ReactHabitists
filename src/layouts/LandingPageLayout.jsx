import React, { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const LandingPageLayout = () => {
    document.title = process.env.REACT_APP_NAME;

    return (
        <Fragment>
            {/* AppBar as Menubar */}
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box component="img" src="assets/images/landing-header-image.svg" alt="logo" sx={{ height: 36 }} />

                    {/* Navigation and Action Buttons */}
                    <Box display="flex" alignItems="center" gap={3}>
                        <Typography
                            component={Link}
                            to="#"
                            sx={{
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            Features
                        </Typography>
                        <Typography
                            component={Link}
                            to="#"
                            sx={{
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            Blogs
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#F97E6D',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                padding: '6px 16px',
                                '&:hover': { backgroundColor: '#f25b4a' },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content Section */}
            <section style={{ paddingTop: '3rem' }}>
                <Outlet />
            </section>
        </Fragment>
    );
};

export default LandingPageLayout;
