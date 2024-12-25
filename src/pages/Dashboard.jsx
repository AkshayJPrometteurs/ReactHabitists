import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import WebAppLayout from '../layouts/WebAppLayout';
import Axios from '../components/Axios';
import { FaCirclePlus } from "react-icons/fa6";
import { HiEye } from "react-icons/hi";
import moment from 'moment';
import NoData from '../components/NoData';
import { Button, Divider, Skeleton } from '@mui/material';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    const [dashboardDetails, setDashboardDetails] = useState([]);
    const [tasksLoader, setTasksLoader] = useState(true);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [insightsLoading, setInsightsLoading] = useState(true);
    const [insightsData, setInsightsData] = useState(true);

    const date = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    const dashboardDate = date.toLocaleDateString('en-US', options).replace(',', '');

    const getDashboardDetails = async() => {
        try{
            const response = await Axios.get('home_screen',{params: { user_id: user.id, date : new Date().toISOString().split('T')[0] }});
            setDashboardDetails(response.data);
            setTasksLoader(false);
        }catch(error){ setTasksLoader(false); }
    }
    const getTaskStatus = (status) => {
        switch (status) {case 0: return "Not Started";case 1: return "Completed";case 2: return "Rescheduled";case 3: return "Cancelled";default: return "Unknown Status";}
    };
    const getInsightsDetails = async() =>{
        setInsightsLoading(true);
        try {
            const response = await Axios.get('your_insights_for_week', { params: { user_id: user.id, week_start : moment().startOf('week').format('YYYY-MM-DD'), week_end : moment().endOf('week').format('YYYY-MM-DD') } });
            if(response.data.status === 200){
                setInsightsLoading(false);
                if(response.data?.data?.your_insights_week?.completed_tasks && response.data?.data?.your_insights_week?.not_completed_tasks && response.data?.data?.your_insights_week?.rescheduled_tasks && response.data?.data?.your_insights_week?.cancelled_tasks){ setInsightsData(false); }
                const data = {
                    labels: ['Completed', 'Not Completed', 'Rescheduled', 'Cancelled'],
                    datasets: [{
                        data: [
                            response.data?.data?.your_insights_week?.completed_tasks,
                            // 50,
                            response.data?.data?.your_insights_week?.not_completed_tasks,
                            // 63,
                            response.data?.data?.your_insights_week?.rescheduled_tasks,
                            // 69,
                            response.data?.data?.your_insights_week?.cancelled_tasks],
                            // 55],
                        backgroundColor: ['#4A9D93','#A1CEC5','#FAC390','#F97E6D'],
                        hoverBackgroundColor: ['#4A9D93','#A1CEC5','#FAC390','#F97E6D']
                    }]
                };
                const options = { cutout: '60%' };
                setChartData(data);
                setChartOptions(options);
            }
        } catch (error) { console.error(error) }
    }
    useEffect(()=>{
        if(user){
            getDashboardDetails();
            getInsightsDetails();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])
    return (
        <WebAppLayout pageTitle={'Dashboard'}>
            {tasksLoader ? <Skeleton height='100px' /> : (
                <section className='bg-primaryColor py-3 px-5 rounded-lg text-white shadow-md mb-4'>
                    <p className='md:text-base'>{dashboardDate}</p>
                    <p className='text-base md:text-xl mt-2 font-semibold tracking-wide'>{dashboardDetails.data?.slogan_for_crushing?.slogan_name || dashboardDetails.message}</p>
                </section>
            )}
            <section className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 dashboard-cards'>
                {tasksLoader ? <Skeleton height='auto' /> : (
                    <div className='p-3 shadow-md rounded-lg border-[1px]'>
                        <h1 className='text-lg font-semibold text-center'>Today's Tasks</h1>
                        <Divider className='my-3' />
                        {dashboardDetails.data?.tasks?.tasks_data?.length > 0 ?
                            <Fragment>
                                {dashboardDetails.data?.tasks?.tasks_data?.slice(0, 5).map((task, index) => (
                                    <div key={index+1} className='bg-gray-100 py-2.5 px-4 rounded-lg flex items-center justify-between gap-3 mb-3'>
                                        <div className='flex items-center gap-3'>
                                            <img src={`${process.env.REACT_APP_BACKEND_URL}assets/images/tasks/${task.task_sub_category_parent_image}`} alt="tasks_name" className='h-10 w-10 rounded-md' />
                                            <div>
                                                <p title={task.task_sub_category_parent_name}>{task.task_sub_category_parent_name}</p>
                                                <p title={`${task.task_start_time} To ${task.task_end_time}`}>{task.task_start_time} To {task.task_end_time}</p>
                                            </div>
                                        </div>
                                        <p className='font-bold'>{getTaskStatus(Number(task.task_status))}</p>
                                    </div>
                                ))}
                                <Divider className='my-3' />
                                <Link to="/tasks" className='flex items-center justify-center gap-2 text-primaryColor w-full'>
                                    <FaCirclePlus size={'1.2rem'}/>
                                    <span>Add more tasks</span>
                                </Link>
                            </Fragment>
                            :
                            <div className='flex flex-col justify-center'>
                                <img src="assets/images/noTaskImage.svg" alt="no-tasks-image" srcSet="assets/images/noTaskImage.svg" className='max-w-96 mx-auto' />
                                <Link to="/tasks" className='flex items-center justify-center gap-2 w-full'><Button label="Create New Tasks" icon="pi pi-plus" className="p-button-text bg-secondaryColor text-white"/></Link>
                            </div>
                        }
                    </div>
                )}
                {tasksLoader ? <Skeleton height='auto' /> : (
                    <div className='p-3 shadow-md rounded-lg border-[1px]'>
                        <h1 className='text-lg font-semibold text-center'>Challenges</h1>
                        <Divider className='my-3' />
                        <div></div>
                        <Divider className='my-3' />
                        <Link to="/tasks" className='flex items-center justify-center gap-2 text-primaryColor w-full'>
                            <HiEye size={'1.2rem'}/>
                            <span>View all challenges</span>
                        </Link>
                    </div>
                )}
                {insightsLoading ? <Skeleton height='auto' /> : (
                    <div className='p-3 shadow-md rounded-lg border-[1px]'>
                        <h1 className='text-lg font-semibold text-center'>Your Insights</h1>
                        <Divider className='my-3' />
                        {/* {insightsData ? <NoData /> : <Chart type="doughnut" data={chartData} options={chartOptions} />} */}
                    </div>
                )}
            </section>
        </WebAppLayout>
    )
}

export default Dashboard