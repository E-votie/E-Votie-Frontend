// AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';
import KeycloakService from "./../services/KeycloakService.jsx";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(KeycloakService.isLoggedIn());

    useEffect(() => {
        const updateAuthStatus = () => {
            setIsAuthenticated(KeycloakService.isLoggedIn());
        };

        // Update auth status when Keycloak auth state changes
        KeycloakService.onAuthChange(updateAuthStatus);

        return () => {
            // Clean up the listener when component unmounts
            KeycloakService.offAuthChange(updateAuthStatus);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
