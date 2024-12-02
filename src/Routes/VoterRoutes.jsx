// src/routes/VoterRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import {Announcements} from "../Pages/Announcements.jsx";
import ProtectedRoute from "../services/ProtectedRoute.jsx";
import StatementOfElectoralRegistrationForm from "../Pages/Voter/Statement_o_Electoral_Registration.jsx";
import CandidateNominationForm from "../Pages/Voter/Candidate/Candidate_Nomination.jsx";
import PostalVoteForm from "../Pages/Voter/PostalVote.jsx";
import {VoterDetails} from "../Pages/Voter/VoterDetails.jsx";
import {ElectionRegistration} from "../Pages/Voter/ElectionRegistration.jsx";
import ElectionSlip from "../Pages/Voter/ElectionSlip.jsx";
import PartyRequestDetails from "../Pages/Voter/VoterPartyNotification.jsx";

const VoterRoutes = () => {
    return (
        <>
            <Route path="/announcements" element={<Announcements />} />
            <Route
                path="/StatementOfElectoralRegistration"
                element={
                    <ProtectedRoute
                        element={StatementOfElectoralRegistrationForm}
                        role="Voter"
                    />
                }
            />
            <Route
                path="/candidate_nomination_form"
                element={
                    <ProtectedRoute
                        element={CandidateNominationForm}
                        role="Voter"
                    />
                }
            />
            <Route
                path="/voter/postal_vote"
                element={
                    <ProtectedRoute
                        element={PostalVoteForm}
                        role="Voter"
                    />
                }
            />
            <Route
                path="/voter/profile"
                element={
                    <ProtectedRoute
                        element={VoterDetails}
                        role="Voter"
                    />
                }
            />
            <Route
                path="/voter/election_registration"
                element={
                    <ProtectedRoute
                        element={ElectionRegistration}
                        role="Voter"
                    />
                }
            />
            <Route
                path="/voter/election_slip/:NIC"
                element={
                    <ProtectedRoute
                        element={ElectionSlip}
                        role="Voter"
                    />
                }
            />
            <Route
                path="/voter/party_request_details/:partyID/:receiverNIC"
                element={
                    <ProtectedRoute
                        element={PartyRequestDetails}
                        role="Voter"
                    />
                }
            />

        </>
    );
};

export default VoterRoutes;
