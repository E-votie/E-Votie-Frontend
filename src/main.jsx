// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from "./Auth/AuthProvider.jsx";
import KeycloakService from "./services/KeycloakService.jsx";
import 'leaflet/dist/leaflet.css';

console.log("Initializing Keycloak in index.jsx...");
KeycloakService.initKeycloak(() => {
    console.log("Keycloak initialized, rendering React app...");
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </React.StrictMode>
    );
});