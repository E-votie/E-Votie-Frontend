import {Route} from "react-router-dom";
import {Party} from "../Pages/Party/Party.jsx";

import React from "react";
import {VoterVerify} from "../Pages/PollingStation/VoterVerify.jsx";
import {PollingStationHome} from "../Pages/PollingStation/PollingStationHome.jsx";
import ProtectedRoute from "../services/ProtectedRoute.jsx";
import VerificationHome from "../Pages/VerificationOfficer/VerificationHome.jsx";

const pollingStationRoutes = () => {
    return (
        <>
            <Route
                path="/polling_station/voter_verify"
                element={
                    <ProtectedRoute
                        element={VoterVerify}
                        role="pollingStation"
                    />
                }
            />
            <Route
                path="/polling_station"
                element={
                    <ProtectedRoute
                        element={PollingStationHome}
                        role="pollingStation"
                    />
                }
            />
        </>
    );
};

export default pollingStationRoutes;