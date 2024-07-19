import React, { useEffect, useState } from 'react';
import { DataProvider } from '../services/TableDataContext.jsx';
import ColumnGroupingTable from './../../Components/Table.jsx';

export const VoterApplications = () => {

    return (
        <DataProvider>
            <ColumnGroupingTable />
        </DataProvider>
    );
};

