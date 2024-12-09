import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/slices/authSlice";
import { Toast } from 'primereact/toast';
import Loader from "../pages/webapp/Loader";

const ContextData = createContext();
export const ServiceContext = ({ children }) => {
    const dispatch = useDispatch();
    const toastRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const showToast = (severity, summary, detail) => {
        toastRef.current?.show({ severity, summary, detail });
    };

    useEffect(() => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            setLoading(true)
            dispatch(fetchUser()).finally(() => setLoading(false));
        } else { setLoading(false); }
    }, [dispatch]);

    return (
        <ContextData.Provider value={{ showToast }}>
            <Toast ref={toastRef} />
            {loading ? <Loader /> : children}
        </ContextData.Provider>
    );
};

export const useServiceContext = () => useContext(ContextData);