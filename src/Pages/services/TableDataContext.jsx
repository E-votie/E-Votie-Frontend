// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {authGet} from '../../Auth/authFetch.jsx';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [columns, setColumns] = useState([
        { id: 'applicationID', label: 'Application ID', minWidth: 170 },
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'address', label: 'Address', minWidth: 170 },
        { id: 'houseNo', label: 'House No', minWidth: 170 },
        { id: 'nic', label: 'NIC', minWidth: 170 }
    ]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await authGet('/gramaniladhari/new-applications');
                setRows(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ columns, rows }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
