// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import KeycloakService from './KeycloakService';

const ProtectedRoute = ({ element: Element, role, ...rest }) => {
    if (!KeycloakService.isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    if (KeycloakService.hasRole(role)) {
        return <Element {...rest} />;
    } else {
        return <Navigate to="/unauthorized" replace />;
    }
};

export default ProtectedRoute;