import React, { useEffect, useState } from 'react';
import { DataProvider } from '../../services/TableDataContext.jsx';
import ColumnGroupingTable from './../../Components/Table.jsx';


const voter_application = [
    { id: 'applicationID', label: 'Application ID', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: 'houseNo', label: 'House No', minWidth: 170 },
    { id: 'nic', label: 'NIC', minWidth: 170 }
]

const title = "Pending Voter Applications"

export const VoterApplications = () => {

    return (
        <DataProvider link={"/gramaniladhari/new-applications"} tableData={voter_application}>
            <ColumnGroupingTable link={"/GN/form_review/"} title={title}/>
        </DataProvider>
    );
};

