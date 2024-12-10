import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import React from 'react'

const Loader = () => {
    return (
        <section className='bg-[#D1DFDF] h-screen flex flex-col justify-center items-center'>
            <img src="assets/images/landing-header-image.svg" alt="logo" className='w-auto h-20 mb-2' />
            <Divider className='w-96 loaderDivider' />
            <Button size='large' style={{ fontSize : '1.4rem' }} className='opacity-100 text-secondaryColor p-0' label="Please wait..." text loading={true} />
        </section>
    )
}

export default Loader