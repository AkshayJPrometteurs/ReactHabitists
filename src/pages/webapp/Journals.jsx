import React from 'react';
import WebAppLayout from '../../layouts/WebAppLayout';
import { Divider } from 'primereact/divider';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

const Journals = () => {
    return (
        <WebAppLayout>
            <section className='p-4 shadow-lg rounded-lg border flex flex-col md:flex-row justify-content-center'>
                <div className='flex-1'>
                    <h1 className='text-center text-lg font-semibold uppercase'>Journals List</h1>
                    <Divider/>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText className='w-full bg-gray-50' placeholder="Search" />
                    </IconField>
                </div>
                <Divider layout="vertical" className='hidden md:block' />
                <Divider className='block md:hidden' />
                <p className='flex-1'>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                </p>
            </section>
        </WebAppLayout>
    )
}

export default Journals