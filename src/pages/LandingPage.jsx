import React, { Fragment, useEffect, useState } from 'react'
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

const LandingPage = () => {
    document.title = process.env.REACT_APP_NAME;
    const { user } = useSelector((state) => state.auth);
    const start = <img alt="logo" src="assets/images/landing-header-image.svg" className="mr-2 w-auto h-9"></img>;
    const end = (
        <div className="grid grid-cols-3 items-center text-center gap-2">
            <Link to={'#'} className='font-bold'>Features</Link>
            <Link to={'#'} className='font-bold'>Blogs</Link>
            {user ? (
                <Link to={'/dashboard'}><Button className='p-button-text text-white bg-[#F97E6D] rounded-lg' label="Dashboard" /></Link>
            ) : (
                <Link to={'/sign-in'}><Button className='p-button-text text-white bg-[#F97E6D] rounded-lg' label="Sign In" /></Link>
            )}

        </div>
    );
    const [testimonials, setTestimonials] = useState([]);
    const getTestimonials = async () => {
        try {
            const res = await axios.get('/testimonials');
            setTestimonials(res.data.data);
        } catch (err) { console.error(err); }
    };

    useEffect(()=>{ getTestimonials(); },[])

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        autoplay: true,
        speed: 5000,
        cssEase: "linear",
        pauseOnHover: false,
        padding: "60px",
        swipeToSlide: false,
        className: "center",
        centerMode: true,
    };

    return (
        <Fragment>
            {/* <Menubar model={[]} start={start} end={end} /> */}
            <section className='pt-12 sm:pt-18'>
                <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl text-center mx-auto">Your future self is waiting for you to level up!</h1>
                <p className="mt-8 text-sm text-black sm:text-lg lg:text-xl text-center mx-auto">Build lasting habits for you and your family. We simplify habit building with the proven <strong>Cue-Response-Reward</strong> formula. Unlock your full potential today.</p>
                {/* <img src="assets/images/landing-section1-image.svg" alt="" /> */}
                <div className='flex justify-center gap-3 mt-5 w-full md:w-1/2 mx-auto'>
                    <button type="button" className="flex items-center justify-center w-44 text-white bg-black rounded-lg h-14">
                        <div className="mr-3">
                            <svg viewBox="30 336.7 120.9 129.2" width="25"><path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"></path><path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"></path><path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"></path><path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"></path></svg>
                        </div>
                        <div>
                            <div className="text-xs">GET IT ON</div>
                            <div className="-mt-1 font-sans font-semibold">Google Play</div>
                        </div>
                    </button>
                    <button type="button" className="flex items-center justify-center w-44 text-white bg-black h-14 rounded-lg">
                        <div className="mr-3">
                            <svg viewBox="0 0 384 512" width="25"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs">Download on the</div>
                            <div className="-mt-1 font-sans font-semibold">App Store</div>
                        </div>
                    </button>
                </div>
                <div className='container'>
                    <Slider {...settings} className='w-full'>
                        {testimonials.map((data,index) => {
                            return(
                                <Fragment key={index+1}>
                                    <div className="card border-2 border-black rounded-lg p-3 w-full h-52 overflow-hidden flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                        {/* <Rating value={data.rating} readOnly stars={5} cancel={false} /> */}
                                        </div>
                                        <p className="text-base font-semibold text-black truncate">{data.title}</p>
                                        <p className="text-sm font-normal my-2 text-black overflow-hidden text-ellipsis h-16 line-clamp-3">{data.description}</p>
                                        <div className="mt-auto">
                                            <p className="text-sm font-medium text-black">{data.user_name}</p>
                                            <p className="text-xs font-normal text-gray-600">{data.company_info}</p>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })}
                    </Slider>
                </div>
            </section>
        </Fragment>
    )
}

export default LandingPage