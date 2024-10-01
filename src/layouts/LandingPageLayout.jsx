import React, { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

const LandingPageLayout = () => {
    document.title = process.env.REACT_APP_NAME;
    const start = <img alt="logo" src="assets/images/landing-header-image.svg" className="mr-2 w-auto h-9"></img>;
    const end = (
        <div className="grid grid-cols-3 items-center text-center gap-2">
            <Link to={'#'} className='font-bold'>Features</Link>
            <Link to={'#'} className='font-bold'>Blogs</Link>
            <Button className='inline-flex items-center justify-center px-3.5 pt-1.5 pb-2.5 text-sm sm:text-base font-semibold transition-all duration-200 text-white bg-[#F97E6D] rounded-lg' label="Submit" />
        </div>
    );
    return (
        <Fragment>
            <Menubar model={[]} start={start} end={end} />
            <section className='pt-12 sm:pt-18'>
                <Outlet/>
            </section>
        </Fragment>
    )
}

export default LandingPageLayout