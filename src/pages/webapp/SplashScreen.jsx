import React, { useEffect, useState } from 'react';
import { ToggleButton } from 'primereact/togglebutton';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../../components/Axios';
import { Button } from 'primereact/button';

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
    useEffect(() => { localStorage.setItem('splashQues', JSON.stringify(selectedQuesIds)); }, [selectedQuesIds]);
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 md:h-screen'>
            <div className='flex flex-col justify-center p-3 md:p-5 bg-[#E8EFEF]'>
                <img src="assets/images/landing-header-image.svg" alt="logo" className='w-auto h-10' />
                <img src="assets/images/splashScreenImg.svg" alt="logo" className='w-auto h-[60%] my-auto hidden md:block' />
            </div>
            <div className='flex flex-col'>
                <div className={`md:px-28 p-5 my-auto ${splashQuesShow ? 'block' : 'hidden'}`}>
                    <p className='text-lg m-2 font-extrabold'>Can you relate?</p>
                    <div className='overflow-y-auto'>
                        {splashQues.length > 0 ? (
                            splashQues.map(option => (
                                <ToggleButton key={option.id} checked={selectedQuesIds.includes(option.id)} onChange={() => handleToggleChange(option.id)} onLabel={option.questions} offLabel={option.questions} className='m-2 splashQuesTogggle' />
                            ))
                        ) : ( <p>Loading options...</p> )}
                    </div>
                    <Button disabled={selectedQuesIds.length > 0 ? false : true} onClick={handleSplashDoneBtn} className='bg-black rounded-xl w-full py-2.5 mt-8 flex justify-center gap-2 items-center border-0'>Done</Button>
                </div>
                <div className={`md:px-28 p-5 text-gray-400 my-auto ${splashQuesShow ? 'hidden' : 'block'}`}>
                    <p className='text-black font-bold pt-3 text-lg'>Make your life simple!</p>
                    <p className='py-4'>Unlock a world of possibilities and reclaim your valuable time. <strong className='text-black font-bold'>Lakshya</strong> uses behavioral science to simplify your life and make every moment more enjoyable.</p>
                    <p>Let's embark on this transformative journey together and discover a better way to live, work, and thrive!</p>
                    <button onClick={handleSplashHelloButton} className='bg-black rounded-xl text-white w-full py-2 mt-8 flex justify-center gap-2 items-center cursor-pointer'>Hello <img src="assets/images/hand.svg" alt="hand" /></button>
                </div>
                <p className='p-4 text-center'>Already have an account? <Link className='text-[#18676C] font-bold' to={'/login'}>Login</Link></p>
            </div>
        </section>
    )
}

export default SplashScreen