import * as React from 'react';
import { DataProvider } from './../../services/TableDataContext.jsx';
import ColumnGroupingTable from './../../Components/Table.jsx';

export default function UpcomingElections() {
    const voter_application = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'start date', label: 'Start Date', minWidth: 170 },
        { id: 'end date', label: 'End Date', minWidth: 170 },
        // { id: 'nic', label: 'NIC', minWidth: 170 }
    ]

    const rows = [
        { name: 'Election 1', type: 'Presidential', 'start date': '2024-10-01', 'end date': '2024-10-15' },
        { name: 'Election 2', type: 'Congressional', 'start date': '2024-11-01', 'end date': '2024-11-15' },
        { name: 'Election 3', type: 'Local', 'start date': '2024-12-01', 'end date': '2024-12-15' },
    ];

    const title = "Upcoming Elections"

    return (
        <DataProvider link={"/verification_officer/get_voter_applications"} tableData={voter_application} title={title}>
            <ColumnGroupingTable link={"/verification_officer/form_review/"} title={title} />
        </DataProvider>
    );
}
