import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#18676C',
        },
    },
    typography: { fontFamily: `'Montserrat', sans-serif !important` },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('Montserrat');
                }
                body { font-family: 'Montserrat', sans-serif !important; }
            `,
        },
    },
});

export default theme;
