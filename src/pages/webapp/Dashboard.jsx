import React from 'react'
import { useServiceContext } from '../../context/ContextProvider'

const Dashboard = () => {
    const { authData } = useServiceContext();
    console.log(authData)
    return (
        <div>{authData.first_name}</div>
    )
}

export default Dashboard