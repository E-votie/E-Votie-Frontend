// src/routes/VoterRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from "../services/ProtectedRoute.jsx";
import {VoterApplicationsVerificationOfficer} from "../Pages/VerificationOfficer/VoterApplications.jsx";
import {FormReviewVerificationOfficer} from "../Pages/VerificationOfficer/FormReview.jsx";
import {FingerprintReg} from "../Pages/VerificationOfficer/FingerprintReg.jsx";
import {CandidateApplicationsVerificationOfficer} from "../Pages/VerificationOfficer/CandidateApplications.jsx";
import VerificationHome from "../Pages/VerificationOfficer/VerificationHome.jsx";


const VerificationOfficerRoutes = () => {
    return (
        <>
            <Route
                path="/verification_officer"
                element={
                    <ProtectedRoute
                        element={VerificationHome}
                        role="VerificationOfficer"
                    />
                }
            />
            <Route
                path="/verification_officer/voter_applications"
                element={
                    <ProtectedRoute
                        element={VoterApplicationsVerificationOfficer}
                        role="VerificationOfficer"
                    />
                }
            />
            <Route
                path="/verification/Home"
                element={
                    <ProtectedRoute
                        element={VerificationHome}
                        role="VerificationOfficer"
                    />
                }
            />
            <Route
                path="/verification_officer/form_review/:ApplicationID"
                element={
                    <ProtectedRoute
                        element={FormReviewVerificationOfficer}
                        role="VerificationOfficer"
                    />
                }
            />

            <Route
                path="/verification_officer/fingerprint_scan"
                element={
                    <ProtectedRoute
                        element={FingerprintReg}
                        role="VerificationOfficer"
                    />
                }
            />
            <Route path="/verification_officer/candidate_applications" element={<CandidateApplicationsVerificationOfficer />} />

        </>
    );
};

export default VerificationOfficerRoutes;
