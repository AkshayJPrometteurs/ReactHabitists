import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdSpaceDashboard, MdInsights } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { LuGoal } from "react-icons/lu";
import { IoIosJournal } from "react-icons/io";
import { PiChatsCircleFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";

const WebSidebar = ({classes,headerClass}) => {
    const menus = [
        { name: 'Dashboard', path: '/dashboard', icon: <MdSpaceDashboard size={'1.3rem'} /> },
        { name: 'Create Tasks', path: '/create-tasks', icon: <FaTasks size={'1.2rem'} /> },
        { name: 'Activity', path: '/activity', icon: <RxActivityLog size={'1.2rem'} /> },
        { name: 'Challenges', path: '/challenges', icon: <LuGoal size={'1.3rem'} /> },
        { name: 'Journal', path: '/journals', icon: <IoIosJournal size={'1.3rem'} /> },
        { name: 'Your Insights', path: '/insights', icon: <MdInsights size={'1.3rem'} /> },
        { name: 'Chats', path: '/chats', icon: <PiChatsCircleFill size={'1.3rem'} /> },
        { name: 'Settings', path: '/settings', icon: <IoSettings size={'1.3rem'} /> }
    ];

    return (
        <aside className={classes}>
            <div className={headerClass}>
                <img alt="logo" src="assets/images/landing-header-image.svg" className='w-auto h-10 mx-auto hidden md:block mt-1'/>
                <hr className='border-secondaryColor my-4 mx-2'/>
            </div>
            <div style={{ height : 'calc(100vh - 101px)' }} className='overflow-y-auto pr-2'>
                {menus.map((data, index) => (
                    <NavLink key={index+1} to={data.path} className={({ isActive }) => `text-base gap-3 flex items-center py-2 px-3 rounded-lg group transition-all delay-100 mb-3 ${isActive ? 'bg-primaryColor text-white shadow-md' : 'text-gray-800 hover:bg-secondaryColor hover:text-white hover:shadow-md'}`}>
                        {data.icon} <span>{data.name}</span>
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default WebSidebar;
