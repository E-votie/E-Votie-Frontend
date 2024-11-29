// src/routes/VoterRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import {Party} from "../Pages/Party/Party.jsx";
import {PartyRegistration} from "../Pages/Party/PartyRegistration.jsx";
import {PartyApplication} from "../Pages/Party/PartyApplication.jsx";
import {PartyMember} from "../Pages/Party/PartyMember.jsx";
import {Manifesto} from "../Pages/Party/Manifesto.jsx";
import {Election} from "../Pages/Party/Election.jsx";
import {PartyList} from "../Pages/Party/PartyList.jsx";


const PartyRoutes = () => {
    return (
        <>
            <Route path="/party/:partyId" element={<Party />} />
            <Route path="/party/list" element={<PartyList />} />
            <Route path="/party/registration" element={<PartyRegistration />} />
            <Route path="/party/registration/application/:partyId" element={<PartyApplication />} />
            <Route path="/party/member" element={<PartyMember />} />
            <Route path="/party/member/manifesto" element={<Manifesto />} />
            <Route path="/election" element={<Election />} />
        </>
    );
};

export default PartyRoutes;
