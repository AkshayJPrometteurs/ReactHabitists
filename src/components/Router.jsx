import { createBrowserRouter } from 'react-router-dom';
import LandingPageLayout from '../layouts/LandingPageLayout';
import SplashScreen from '../pages/SplashScreen';
import SignUp from '../pages/auth/SignUp';
import SignIn from '../pages/auth/SignIn';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';
import Settings from '../pages/Settings';
import Journals from '../pages/Journals';

const Router = createBrowserRouter([
    { element : <LandingPageLayout/> },
    { path:'/', element : <LandingPage/> },
    { path:'/splash-screen', element : <SplashScreen/> },
    { path : '/sign-up', element: <SignUp/> },
    { path : '/sign-in', element: <SignIn/> },
    { path : '/dashboard', element: <Dashboard/> },
    { path : '/settings', element: <Settings/> },
    { path : '/journals', element: <Journals/> },
],{ future: { v7_fetcherPersist: true, v7_normalizeFormMethod: true, } });

export default Router