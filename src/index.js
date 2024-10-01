import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { PrimeReactProvider } from 'primereact/api';
import './assets/css/theme.css';
import "primereact/resources/primereact.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fontsource/montserrat';
import { ServiceContext } from './context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PrimeReactProvider>
    <ServiceContext>
      <RouterProvider router={Router} />
    </ServiceContext>
  </PrimeReactProvider>
);
reportWebVitals();
