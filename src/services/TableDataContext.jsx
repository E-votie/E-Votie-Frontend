import React, { createContext, useContext, useEffect, useState } from 'react';
import { authGet } from '../Auth/authFetch.jsx';

const DataContext = createContext();

export const DataProvider = ({ children, link, tableData,title="" }) => {
    const [columns, setColumns] = useState(tableData);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const data = await authGet(link);
                console.log(data);
                if(title === "Upcoming Elections"){
                    setRows(data.data);
                }else{
                    setRows(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();
    }, [link]);

    return (
        <DataContext.Provider value={{ columns, rows, loading }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
