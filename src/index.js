import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import Router from './components/Router';
import { PrimeReactProvider } from 'primereact/api';
import './assets/css/theme.css';
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fontsource/montserrat';
import { ServiceContext } from './context/ContextProvider';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PrimeReactProvider>
      <ServiceContext>
        <RouterProvider router={Router} />
      </ServiceContext>
    </PrimeReactProvider>
  </Provider>
);
reportWebVitals();
