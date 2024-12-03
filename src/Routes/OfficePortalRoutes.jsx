// src/routes/VoterRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from "../services/ProtectedRoute.jsx";
import OpHome from "../Pages/OffiecPortal/OpHome.jsx";
import PostalVoteApplications from "../Pages/OffiecPortal/PostalVoteApplications.jsx";
import ElectionDutyLog from "../Pages/OffiecPortal/ElectionDutyLog.jsx";
import ElectionDutyApplications from "../Pages/OffiecPortal/ElectionDutyApplications.jsx";

const OfficePortalRoutes = () => {
    return (
        <>

            <Route
                            path="/OpHome"
                            element={
                                <ProtectedRoute
                                    element={OpHome}
                                    role="GovOffice"
                                />
                            }
                        />

                        <Route
                                path="/ElectionDutyApplications"
                                element={
                                <ProtectedRoute
                                element={ElectionDutyApplications}
                                role="GovOffice"
                                        />
                                }
                        />

            <Route
                            path="/PostalVoteApplications"
                            element={
                                    <PostalVoteApplications/>
                            }
                        />

            <Route
                            path="/ElectionDutyLog"
                            element={
                                    <ElectionDutyLog/>
                            }
                        />

        </>
    );
};

export default OfficePortalRoutes;
