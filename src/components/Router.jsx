import { createBrowserRouter } from 'react-router-dom';
import LandingPageLayout from '../layouts/LandingPageLayout';
import SplashScreen from '../pages/webapp/SplashScreen';
import SignUp from '../pages/webapp/auth/SignUp';
import SignIn from '../pages/webapp/auth/SignIn';
import Dashboard from '../pages/webapp/Dashboard';
import LandingPage from '../pages/landingpage/LandingPage';
import Settings from '../pages/webapp/Settings';
import Journals from '../pages/webapp/Journals';

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