import React, { useEffect, useState } from 'react';
import { Button, ToggleButtonGroup, ToggleButton, Typography, Box, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../components/Axios';
import GuestLayout from '../layouts/GuestLayout';

const SplashScreen = () => {
    const theme = useTheme();
    const [splashScreenQuestions, setSplashScreenQuestions] = useState([]);
    const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
    const [showSplashQuestions, setShowSplashQuestions] = useState(false);
    const navigate = useNavigate();

    const getSplashQues = async () => {
        try {
            const res = await Axios.get('/splash_screen_questions');
            setSplashScreenQuestions(res.data.data.questions);
        } catch (err) { console.error(err); }
    };

    const handleToggleChange = (optionId,optionSlug) => {
        setSelectedQuestionIds(prevSelectedIds => {
            if (optionSlug === "none-of-this") {
                if (prevSelectedIds.includes(optionId)) { return prevSelectedIds.filter(id => id !== optionId);
                } else { return [optionId]; }
            } else {
                if (prevSelectedIds.includes(optionId)) { return prevSelectedIds.filter(id => id !== optionId);
                } else {
                    return prevSelectedIds.filter(id => splashScreenQuestions.find(question => question.questions_slug === "none-of-this").id !== id).concat(optionId);
                }
            }
        });
    };

    const handleSplashHelloButton = () => { setShowSplashQuestions(true); };
    const handleSplashDoneBtn = () => { navigate('/sign-up'); };
    useEffect(() => { getSplashQues(); }, []);
    useEffect(() => { localStorage.setItem('splashQues', JSON.stringify(selectedQuestionIds)); }, [selectedQuestionIds]);

    return (
        <GuestLayout pageTitle="Splash Screen" leftPanelImgURL="assets/images/splashScreen.svg">
            <Box sx={{ px: { md: 7 }, p: 2, my: 'auto', display: showSplashQuestions ? 'block' : 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Can you relate?</Typography>
                <Box sx={{ overflowY: 'auto', maxHeight: '400px' }}>
                    {splashScreenQuestions.length > 0 ? (
                        splashScreenQuestions.map((option) => (
                            <ToggleButtonGroup key={option.id} value={selectedQuestionIds} onChange={() => handleToggleChange(option.id, option.questions_slug)} exclusive>
                                <ToggleButton value={option.id}
                                    sx={{ borderRadius: 2, m: 1,
                                        backgroundColor: selectedQuestionIds.includes(option.id) ? `${theme.palette.primary.main} !important` : 'white !important',
                                        color : selectedQuestionIds.includes(option.id) ? `#fff !important` : '#000 !important',
                                    }}
                                >
                                    {option.questions}
                                </ToggleButton>
                            </ToggleButtonGroup>
                        ))
                    ) : ( <Typography>Loading options...</Typography> )}
                </Box>
                <Button size='large' fullWidth onClick={handleSplashDoneBtn} variant="contained" color="primary" disabled={selectedQuestionIds.length > 0 ? false : true} sx={{ mt: 4 }}>Done</Button>
            </Box>
            <Box sx={{ px: { md: 7 }, p: 2, color: 'gray', my: 'auto', display: showSplashQuestions ? 'none' : 'block' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black', pt: 1 }}>Make your life simple!</Typography>
                <Typography sx={{ py: 2 }}>
                    Unlock a world of possibilities and reclaim your valuable time.{' '}
                    <strong style={{ fontWeight: 'bold', color: 'black' }}>Habitist</strong> uses behavioral science to
                    simplify your life and make every moment more enjoyable.
                </Typography>
                <Typography>Let's embark on this transformative journey together and discover a better way to live, work, and thrive!</Typography>
                <Button onClick={handleSplashHelloButton} variant="contained" color="primary" size='large' fullWidth sx={{ mt: 4 }}>
                    Hello <img src="assets/images/hand.svg" alt="hand" />
                </Button>
            </Box>
            <Typography sx={{ p: 2, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link to="/sign-in" style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>Sign-In</Link>
            </Typography>
        </GuestLayout>
    );
};

export default SplashScreen;
