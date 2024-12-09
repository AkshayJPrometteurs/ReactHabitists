import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import WebSidebar from '../components/WebSidebar';
import NotificationPanel from '../components/NotificationPanel';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import MobileSidebar from '../components/MobileSidebar';
import Modal from '../components/Modal';
import { BsPatchExclamationFill } from 'react-icons/bs';
import { Button } from 'primereact/button';
import Axios from '../components/Axios';

const WebAppLayout = ({children, pageTitle}) => {
    document.title = process.env.REACT_APP_NAME + ": " + pageTitle;
    const { token, user } = useSelector((state) => state.auth);
    const [notificationSidebarToggle, setNotificationSidebarToggle] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [signOutModal, setSignOutModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const signOut = async() => {
        setLoading(true);
        try {
            const response = await Axios.post('/logout');
            setLoading(false);
            response.data.status === 200 && localStorage.clear(); window.location.reload();
        } catch (error) { console.log(error); setLoading(false); }
    };
    const start = (
        <div className='md:hidden flex items-center gap-2'>
            <button onClick={() => setSidebarToggle(true)} type='button' className='p-1.5 hover:bg-gray-100 cursor-pointer mr-2 rounded-full'><GiHamburgerMenu className='text-primaryColor' size={23} /></button>
            <img alt="logo" src="assets/images/landing-header-image.svg" className='w-auto h-10 mr-2'/>
        </div>
    );
    const end = (
        <div className="flex items-center gap-5">
            <Button icon="pi pi-bell" size='large' severity="success" onClick={() => setNotificationSidebarToggle(true)} className='bg-primaryColor border-primaryColor' aria-label="notification" rounded />
            <Button icon="pi pi-power-off" style={{ fontWeight : '500' }} label='Sign Out' severity="danger" onClick={() => setSignOutModal(true)} aria-label="logout" />
            <NotificationPanel notificationSidebarToggle={notificationSidebarToggle} setNotificationSidebarToggle={setNotificationSidebarToggle}/>
            <Modal header="Confirmation" closable={false} headerClassName='text-center' visible={signOutModal}>
                <div className='flex gap-2 items-center mb-9 mt-2'>
                    <BsPatchExclamationFill size={25}/>
                    <p className='text-base'>Are you sure you want to logout now?</p>
                </div>
                {loading ? <Button className='w-full' severity='secondary' type='button' label='Please wait' loading disabled raised/> : (
                    <div className='mt-5 grid grid-cols-2 gap-3'>
                        <Button type='button' raised label="Cancel" onClick={() => setSignOutModal(false)} className="p-button-text border text-black" />
                        <Button type='button' raised label="Yes, Sign Out" severity='danger' onClick={signOut} autoFocus />
                    </div>
                )}
            </Modal>
        </div>
    );
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{if(!token && !user){ navigate('/sign-in'); }},[navigate, token]);
    return (
        <section className='flex flex-row'>
            <WebSidebar classes={'w-[17%] hidden md:block p-4 pt-2 shadow-md bg-gray-200'} headerClass={'block'} />
            <main className='w-full'>
                <Menubar start={start} end={end} className='shadow-md bg-gray-200 rounded-none app-menubar' />
                <div className='p-5 overflow-y-auto app-menus-height'>{children}</div>
            </main>
            <MobileSidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        </section>
    )
}

export default WebAppLayout