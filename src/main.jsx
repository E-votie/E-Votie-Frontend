// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from "./Auth/AuthProvider.jsx";
import KeycloakService from "./services/KeycloakService.jsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { paper: '#fff', default: '#fafafa' },
    // Other theme settings
  },
});

console.log("Initializing Keycloak in index.jsx...");
KeycloakService.initKeycloak(() => {
    console.log("Keycloak initialized, rendering React app...");
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
});
