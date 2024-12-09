import React from 'react'
import { Sidebar } from 'primereact/sidebar';
import WebSidebar from '../components/WebSidebar';

const MobileSidebar = ({sidebarToggle, setSidebarToggle}) => {
    const customHeader = <img alt="logo" src="assets/images/landing-header-image.svg" className='w-auto h-8'/>;
    return (
        <Sidebar header={customHeader} visible={sidebarToggle} position="left" onHide={() => setSidebarToggle(false)}>
            <WebSidebar headerClass={'hidden'} />
        </Sidebar>
    )
}

export default MobileSidebar