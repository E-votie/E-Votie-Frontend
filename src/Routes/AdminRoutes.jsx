import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from "../services/ProtectedRoute.jsx";
import { Inquiries } from "../Pages/Party/Inquiries.jsx";

const AdminRoutes = () => {
    return (
            <Route
                path="/inquiries"
                element={
                    <ProtectedRoute
                        element={<Inquiries />}
                        role="Admin"
                    />
                }
            />
    );
};

export default AdminRoutes;