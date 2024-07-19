import React, { useEffect, useState } from 'react';
import { DataProvider } from './../../services/TableDataContext.jsx';
import ColumnGroupingTable from './../../Components/Table.jsx';

export const VoterApplicationsVerificationOfficer = () => {

    return (
        <DataProvider link={"/verification_officer/get_voter_applications"}>
            <ColumnGroupingTable link={"/verification_officer/form_review/"} />
        </DataProvider>
    );
};

