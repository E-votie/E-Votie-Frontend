// src/routes/VoterRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from "../services/ProtectedRoute.jsx";
import OpHome from "../Pages/OffiecPortal/OpHome.jsx";

const OfficePortalRoutes = () => {
    return (
        <>
            <Route
                path="/OpHome"
                element={
                        <OpHome/>
                }
            />
        </>
    );
};

export default OfficePortalRoutes;
