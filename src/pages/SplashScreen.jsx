import React, { useEffect, useState } from 'react';
import { ToggleButton } from 'primereact/togglebutton';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../components/Axios';
import { Button } from 'primereact/button';
import GuestLayout from '../layouts/GuestLayout';

const SplashScreen = () => {
    const [splashQues, setSplashQues] = useState([]);
    const [selectedQuesIds, setSelectedQuesIds] = useState([]);
    const [splashQuesShow, setSplashQuesShow] = useState(false);
    const navigate = useNavigate();
    const getSplashQues = async () => {
        try {
            const res = await Axios.get('/splash_screen_questions');
            setSplashQues(res.data.data.questions);
        } catch (err) { console.error(err); }
    }
    const handleToggleChange = (optionId) => {
        setSelectedQuesIds(prevSelectedIds => {
            if (prevSelectedIds.includes(optionId)) { return prevSelectedIds.filter(id => id !== optionId);
            } else { return [...prevSelectedIds, optionId]; }
        });
    };
    const handleSplashHelloButton = () => { setSplashQuesShow(true); }
    const handleSplashDoneBtn = () => { navigate('/sign-up') }
    useEffect(() => { getSplashQues(); }, []);
    useEffect(() => { localStorage.setItem('splashQues', selectedQuesIds); }, [selectedQuesIds]);
    return (
        <GuestLayout pageTitle="" leftPanelImgURL="assets/images/splashScreen.svg">
            <div className={`md:px-28 p-5 my-auto ${splashQuesShow ? 'block' : 'hidden'}`}>
                <p className='text-lg m-2 font-extrabold'>Can you relate?</p>
                <div className='overflow-y-auto'>
                    {splashQues.length > 0 ? (
                        splashQues.map(option => (
                            <ToggleButton key={option.id} checked={selectedQuesIds.includes(option.id)} onChange={() => handleToggleChange(option.id, option.questions)} onLabel={option.questions} offLabel={option.questions} className='m-2 splashQuesTogggle' />
                        ))
                    ) : ( <p>Loading options...</p> )}
                </div>
                <Button disabled={selectedQuesIds.length > 0 ? false : true} onClick={handleSplashDoneBtn} className='bg-black rounded-xl w-full py-2.5 mt-8 flex justify-center gap-2 items-center border-0'>Done</Button>
            </div>
            <div className={`md:px-28 p-5 text-gray-400 my-auto ${splashQuesShow ? 'hidden' : 'block'}`}>
                <p className='text-black font-bold pt-3 text-xl'>Make your life simple!</p>
                <p className='py-4 text-base'>Unlock a world of possibilities and reclaim your valuable time. <strong className='text-black font-bold'>Habitist</strong> uses behavioral science to simplify your life and make every moment more enjoyable.</p>
                <p className='text-base'>Let's embark on this transformative journey together and discover a better way to live, work, and thrive!</p>
                <button onClick={handleSplashHelloButton} className='bg-black rounded-xl text-white w-full py-2 mt-8 flex justify-center gap-2 items-center cursor-pointer'>Hello <img src="assets/images/hand.svg" alt="hand" /></button>
            </div>
            <p className='p-4 text-center'>Already have an account? <Link className='text-primaryColor font-bold' to={'/sign-in'}>Sign-In</Link></p>
        </GuestLayout>
    )
}

export default SplashScreen