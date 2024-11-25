import React, { useEffect, useState } from 'react';
import { DataProvider } from './../../services/TableDataContext.jsx';
import ColumnGroupingTable from './../../Components/Table.jsx';

const candidate_application = [
    { id: 'applicationID', label: 'Application ID', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: 'houseNo', label: 'House No', minWidth: 170 },
    { id: 'nic', label: 'NIC', minWidth: 170 }
]

export const CandidateApplicationsVerificationOfficer = () => {

    return (
        <DataProvider link={"/verification_officer/get_candidate_applications"} tableData={candidate_application}>
            <ColumnGroupingTable link={"/verification_officer/candidate_review/"} title={"Voter Application"} />
        </DataProvider>
    );
};

