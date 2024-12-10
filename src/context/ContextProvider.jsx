import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/slices/authSlice";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContextData = createContext();
export const ServiceContext = ({ children }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            setLoading(true)
            dispatch(fetchUser()).finally(() => setLoading(false));
        } else { setLoading(false); }
    }, [dispatch]);

    return (
        <ContextData.Provider value={{  }}>
            {loading ? <Loader /> : children}
            <ToastContainer />
        </ContextData.Provider>
    );
};

export const useServiceContext = () => useContext(ContextData);