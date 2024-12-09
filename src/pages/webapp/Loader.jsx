import { Button } from 'primereact/button'
import React from 'react'

const Loader = () => {
    return (
        <section className='bg-[#D1DFDF] h-screen flex flex-col justify-center items-center'>
            <img src="assets/images/landing-header-image.svg" alt="logo" className='w-auto h-20' />
            <Button size='large' style={{ fontSize : '1.4rem' }} className='opacity-100 mt-6' label="Please wait..." text loading={true} />
        </section>
    )
}

export default Loader