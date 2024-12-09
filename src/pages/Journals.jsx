import React, { Fragment, useEffect, useState } from 'react';
import WebAppLayout from '../layouts/WebAppLayout';
import { Divider } from 'primereact/divider';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import Axios from '../components/Axios';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';
import { Skeleton } from 'primereact/skeleton';
import { Formik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import ErrorValidation from '../components/ErrorValidation';
import { FaMicrophoneAlt } from "react-icons/fa";

const Journals = () => {
    const { user } = useSelector((state) => state.auth);
    const [journalsList, setJournalList] = useState([]);
    const [journalsListLoading, setJournalListLoading] = useState(true);
    const getJournalList = async() => {
        try {
            const response = await Axios.get('journal_list',{ params : { user_id : user.id } });
            setJournalList(response.data.data);
            setJournalListLoading(false);
        } catch (error) { console.error(error) }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{ if(user){ getJournalList(); } },[user])
    return (
        <WebAppLayout pageTitle={'Journals'}>
            <section className='p-4 shadow-lg rounded-lg border flex flex-col md:flex-row justify-content-center'>
                <div className='flex-1'>
                    <h1 className='text-center text-lg font-semibold uppercase'>Journals List</h1>
                    <Divider/>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText className='w-full bg-gray-50' placeholder="Search" />
                    </IconField>
                    <div>
                        {journalsListLoading ? (
                            <Fragment>
                                <Skeleton height='150px'/>
                                <Skeleton height='150px'/>
                                <Skeleton height='150px'/>
                                <Skeleton height='150px'/>
                                <Skeleton height='150px'/>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {journalsList.length > 0 ? (
                                    journalsList.map((journal) => {
                                        return(
                                            <Fragment key={journal.id}>

                                            </Fragment>
                                        )
                                    })
                                ) : <NoData/> }
                            </Fragment>
                        )}

                    </div>
                </div>
                <Divider layout="vertical" className='hidden md:block' />
                <Divider className='block md:hidden' />
                <div className='flex-1'>
                    <h1 className='text-center text-lg font-semibold uppercase'>Add New Journal</h1>
                    <Divider/>
                    <Formik
                        initialValues={{ title: '', description: '', attachment: '', recording : '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.title) {
                                errors.title = "Title is required";
                            }
                            if (!values.description) {
                                errors.description = "Description is required";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                    {({values,errors,touched,handleChange,setFieldValue,handleBlur,handleSubmit,isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label htmlFor="title" className='font-semibold'>Title</label>
                                <InputText keyfilter="alpha" name='title' id='title' onChange={handleChange} onBlur={handleBlur} className='w-full mt-1' />
                                <ErrorValidation errors={errors.title} touched={errors.title}/>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="description" className='font-semibold'>Description</label>
                                <InputTextarea onChange={handleChange} onBlur={handleBlur} name='description' id='description' rows={4} cols={30} className='w-full mt-1' />
                                <ErrorValidation errors={errors.description} touched={errors.description}/>
                            </div>
                            <div className='mb-4'>
                                <FileUpload chooseOptions={{ icon: "pi pi-paperclip" }} className='journal-files-upload' chooseLabel='Attach file here' name="demo" url={'/api/upload'} accept="image/*" maxFileSize={1000000} onSelect={(e) => setFieldValue('attachment', e.files[0])} onRemove={()=>setFieldValue('attachment','')} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                            </div>
                            <div className='flex gap-4'>
                                <Button type='button' className='px-4 bg-secondaryColor border-secondaryColor' rounded icon={<FaMicrophoneAlt size={'1.3rem'} className='text-white'/>} />
                                <Button loading={isSubmitting} type='submit' className='w-full' label="Send" />
                            </div>
                        </form>
                    )}
                    </Formik>
                </div>
            </section>
        </WebAppLayout>
    )
}

export default Journals