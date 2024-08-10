// DataContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import {authGet} from '../Auth/authFetch.jsx';

const DataContext = createContext();

export const DataProvider = ({ children, link, tableData }) => {
    const [columns, setColumns] = useState(tableData);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await authGet(link);
                setRows(data);
                console.log(rows);
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
