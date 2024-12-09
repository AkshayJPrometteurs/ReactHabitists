import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const GuestLayout = ({children,leftPanelImgURL,pageTitle}) => {
    document.title = process.env.REACT_APP_NAME + (pageTitle && ": " + pageTitle);
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(()=>{ if(token && user){ navigate('/dashboard'); } },[navigate, token, user]);
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 md:h-screen'>
            <div className='flex flex-col justify-center p-3 md:p-5 bg-gray-100'>
                <Link to={'/'} className='mx-auto'><img src="assets/images/landing-header-image.svg" alt="logo" className='w-auto h-10' /></Link>
                <img src={leftPanelImgURL} alt="logo" className='max-w-[38.4rem] m-auto hidden md:block' />
            </div>
            <div className='flex flex-col shadow-lg'>{children}</div>
        </section>
    )
}

export default GuestLayout