// src/routes/VoterRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from "../services/ProtectedRoute.jsx";
import {ElectionList} from "../Pages/Election/ElectionList.jsx";
import {CreateElection} from "../Pages/Election/CreateElection.jsx";
import {PollingStationsProvider} from "../Pages/Election/PollingStationsContext.jsx";
import Polling_Stations from "../Pages/Election/Polling_Stations.jsx";
import UpcomingElections from "../Pages/Election/Upcoming_Elections.jsx";
import ElectionTimeline from "../Pages/Election/Election_Timeline.jsx";
import Additional_Materials from "../Pages/Election/Additional_Materials.jsx";
import AddCandidates from "../Pages/Election/AddCandidates.jsx";
import ElectionHome from "../Pages/Election/Election_Home.jsx";
import ElectionSlip from "../Pages/Voter/ElectionSlip.jsx";
import ApprovePartyMembers from "../Pages/Election/ApprovePartyMembers.jsx";


const ElectionRoutes = () => {
    return (
        <>
            <Route
                path="/election/home"
                element={
                    <ProtectedRoute
                        element={ElectionHome}
                        role="ElectionCommissioner"
                    />
                }
            />
            {/*start creating elections*/}
            <Route
                path="/election/list"
                element={
                    <ProtectedRoute
                        element={ElectionList}
                        role="ElectionCommissioner"
                    />
                }
            />
            <Route
                path="/Election/Create"
                element={
                    <ProtectedRoute
                        element={CreateElection}
                        role="ElectionCommissioner"
                    />
                }
            />
            <Route path="/Approve" element={<ApprovePartyMembers />} />
            <Route path="/Election/Polling_Stations/:election_id" element={
                <PollingStationsProvider>
                    <Polling_Stations />
                </PollingStationsProvider>} />
            <Route path="/Election/Upcoming_Elections" element={<UpcomingElections />} />
            <Route
                path="/Election/Election_Timeline/:election_id"
                element={
                    <ProtectedRoute
                        element={ElectionTimeline}
                        role="ElectionCommissioner"
                    />
                }
            />
            <Route path="/Election/Additional_Materials/:election_id" element={<Additional_Materials />} />
            <Route
                path="/Election/AddCandidates/:election_id"
                element={
                    <ProtectedRoute
                        element={AddCandidates}
                        role="ElectionCommissioner"
                    />
                }
            />
        </>
    );
};

export default ElectionRoutes;
