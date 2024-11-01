// src/routes/VoterRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import {VotingPage} from "../Pages/VotingUI/VotingPage.jsx";
import {VotingPageStart} from "../Pages/VotingUI/StartPage.jsx";


const VotingRoutes = () => {
    return (
        <>
            <Route path="/voting_page" element={<VotingPage />} />
            <Route path="/voting_page/start" element={<VotingPageStart />} />
        </>
    );
};

export default VotingRoutes;
