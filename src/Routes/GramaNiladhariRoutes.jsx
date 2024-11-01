// src/routes/VoterRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from "../services/ProtectedRoute.jsx";
import {VoterApplications} from "../Pages/GramaNiladhari/VoterApplications.jsx";
import {FormReview} from "../Pages/GramaNiladhari/FormReview.jsx";
import GnHome from "../Pages/GramaNiladhari/GnHome.jsx";
import {VotersByGnDivision} from "../Pages/GramaNiladhari/Voters.jsx";


const GramaNiladhariRoutes = () => {
    return (
        <>
            <Route
                path="/GN"
                element={
                    <ProtectedRoute
                        element={GnHome}
                        role="GramaNiladhari"
                    />
                }
            />
            <Route
                path="/GN/voter_applications"
                element={
                    <ProtectedRoute
                        element={VoterApplications}
                        role="GramaNiladhari"
                    />
                }
            />
            <Route
                path="/GN/home"
                element={
                    <ProtectedRoute
                        element={GnHome}
                        role="GramaNiladhari"
                    />
                }
            />
            <Route
                path="/GN/Votes"
                element={
                    <ProtectedRoute
                        element={VotersByGnDivision}
                        role="GramaNiladhari"
                    />
                }
            />
            <Route
                path="/GN/form_review/:ApplicationID"
                element={
                    <ProtectedRoute
                        element={FormReview}
                        role="GramaNiladhari"
                    />
                }
            />
        </>
    );
};

export default GramaNiladhariRoutes;
