import React, { useEffect, useState } from 'react';
import { DataProvider } from '../../services/TableDataContext.jsx';
import ColumnGroupingTable from './../../Components/Table.jsx';


const voter_application = [
    { id: 'NIC', label: 'NIC', minWidth: 170 },
    { id: 'Name', label: 'Name', minWidth: 100 },
    { id: 'Address', label: 'Address', minWidth: 170 },
    { id: 'HouseNo', label: 'House No', minWidth: 170 },
    { id: 'Status', label: 'Status', minWidth: 170 }
]

const title = "Eligible votes in GN"

export const VotersByGnDivision = () => {

    return (
        <DataProvider link={"/gramaniladhari/voters"} tableData={voter_application}>
            <ColumnGroupingTable link={"/GN/form_review/"} title={title}/>
        </DataProvider>
    );
};

