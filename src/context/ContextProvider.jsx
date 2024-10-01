import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../components/Axios";

const ContextData = createContext({ authData : {}, setAuthData : () => {} });

export const ServiceContext = ({children}) => {
    const [authData, setAuthData] = useState([]);
    const token = localStorage.getItem('ACCESS_TOKEN');
    useEffect(()=>{
        if(token){
            Axios.get('/user')
            .then((res)=>{ setAuthData(res.data.data.user); })
            .catch((err)=>{ console.log(err) })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return( <ContextData.Provider value={{ authData }}>{children}</ContextData.Provider> )
}

export const useServiceContext = () => useContext(ContextData);