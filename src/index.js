import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import Router from './components/Router';
import '@fontsource/montserrat';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fontsource/montserrat';
import { ServiceContext } from './context/ContextProvider';
import { Provider } from 'react-redux';
import store from './redux/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ServiceContext>
        <RouterProvider router={Router} />
      </ServiceContext>
    </ThemeProvider>
  </Provider>
);
reportWebVitals();
