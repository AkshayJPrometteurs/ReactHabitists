import { createBrowserRouter } from 'react-router-dom';
import LandingPageLayout from './layouts/LandingPageLayout';
import SplashScreen from './pages/webapp/SplashScreen';
import SignUp from './pages/webapp/auth/SignUp';
import SignIn from './pages/webapp/auth/SignIn';
import Dashboard from './pages/webapp/Dashboard';

const Router = createBrowserRouter([
    { element : <LandingPageLayout/> },
    { path:'/', element : <SplashScreen/> },
    { path : '/sign-up', element: <SignUp/> },
    { path : '/login', element: <SignIn/> },
    { path : '/dashboard', element: <Dashboard/> },
]);

export default Router