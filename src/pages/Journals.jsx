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
// import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import ErrorValidation from '../components/ErrorValidation';
import { FaMicrophoneAlt } from "react-icons/fa";
import { ScrollPanel } from 'primereact/scrollpanel';
import moment from 'moment';
import { Editor } from '@tinymce/tinymce-react';

const Journals = () => {
    const { user } = useSelector((state) => state.auth);
    const [journalsList, setJournalList] = useState([]);
    const [journalsListLoading, setJournalListLoading] = useState(true);
    const getJournalList = async() => {
        try {
            const response = await Axios.get('journal_list',{ params : { user_id : user.id } });
            setJournalList(response.data.data.journals);
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
                                <Skeleton height='100px' className='my-3'/>
                                <Skeleton height='100px' className='my-3'/>
                                <Skeleton height='100px' className='my-3'/>
                                <Skeleton height='100px' className='my-3'/>
                            </Fragment>
                        ) : (
                            <ScrollPanel style={{ width: '100%', height: '450px' }}>
                                {journalsList.length === 0 ? <NoData/> : (
                                    journalsList.map((journal) => {
                                        return(<div key={journal.id} className='bg-gray-50 border-[1px] shadow-md p-3 rounded-md my-3'>
                                            <div className='flex flex-col md:flex-row justify-center md:justify-between items-center'>
                                                <p className='font-semibold'>{journal.journal_title}</p>
                                                <p className='text-xs'>{moment(journal.journal_time).format('YYYY-MM-DD, hh:mm a')}</p>
                                            </div>
                                            <hr className='my-2'/>
                                            <p>{journal.journal_desc}</p>
                                        </div>)
                                    })
                                )}
                            </ScrollPanel>
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
                            if (!values.title) { errors.title = "Title is required"; }
                            if (!values.description) { errors.description = "Description is required"; }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                    {({errors,touched,handleChange,setFieldValue,handleBlur,handleSubmit,isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="title" className='font-semibold'>Title</label>
                                <InputText keyfilter="alpha" invalid={(errors.title && touched.title) ? true : false} name='title' id='title' onChange={handleChange} onBlur={handleBlur} className='w-full mt-1' />
                                <ErrorValidation errors={errors.title} touched={touched.title}/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="description" className='font-semibold'>Description</label>
                                {/* <InputTextarea invalid={(errors.description && touched.description) ? true : false} onChange={handleChange} onBlur={handleBlur} name='description' id='description' rows={4} cols={30} className='w-full mt-1' /> */}
                                <Editor apiKey={process.env.REACT_APP_TEXT_EDITOR_KEY}
                                    init={{
                                        height: 180,
                                        menubar: false,
                                        statusbar: false,
                                        plugins: ['lists','table'],
                                        toolbar: 'bold italic | bullist numlist',
                                        content_style: `
                                            .tox .tox-edit-area::before {
                                            border: ${(errors.description && touched.description) ? '2px solid red!important' : '2px solid var(--primary-color)!important'};
                                            }
                                        `,
                                    }}
                                    onBlur={handleBlur}
                                    onEditorChange={(content) => setFieldValue('description', content)}
                                />
                                <ErrorValidation errors={errors.description} touched={touched.description}/>
                            </div>
                            <div className='mb-3'>
                                <FileUpload chooseOptions={{ icon: "pi pi-paperclip", className : 'px-10' }} className='journal-files-upload' chooseLabel='Attach file here' name="demo" url={'/api/upload'} accept="image/*" maxFileSize={1000000} onSelect={(e) => setFieldValue('attachment', e.files[0])} onRemove={()=>setFieldValue('attachment','')} emptyTemplate={<p className="m-0 text-center">Drag and drop files to here to upload.</p>} />
                            </div>
                            <div className='flex gap-4'>
                                <Button type='button' className='px-3 py-2 bg-secondaryColor border-secondaryColor' rounded icon={<FaMicrophoneAlt size={'1.1rem'} className='text-white'/>} />
                                <Button loading={isSubmitting} type='submit' className='w-full' label="Save Now" />
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