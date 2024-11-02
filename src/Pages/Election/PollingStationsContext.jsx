import React, { createContext, useState, useCallback } from 'react';
import districtsData from '../../../public/Resource/Srilankan_Dropdown.json';

export const PollingStationsContext = createContext();

export const PollingStationsProvider = ({ children }) => {
    const [adminDistricts, setAdminDistricts] = useState(Object.keys(districtsData));
    const [selectedAdminDistrict, setSelectedAdminDistrict] = useState('');
    const [electoralDistricts, setElectoralDistricts] = useState([]);
    const [selectedElectoralDistrict, setSelectedElectoralDistrict] = useState('');
    const [pollingDistricts, setPollingDistricts] = useState([]);
    const [selectedPollingDistrict, setSelectedPollingDistrict] = useState('');
    const [pollingStations, setPollingStations] = useState({});

    const handleAdminDistrictChange = useCallback((adminDistrict) => {
        setSelectedAdminDistrict(adminDistrict);
        setElectoralDistricts(Object.keys(districtsData[adminDistrict] || {}));
        setSelectedElectoralDistrict('');
        setPollingDistricts([]);
        setSelectedPollingDistrict('');
    }, []);

    const handleBulkUpload = useCallback((jsonData) => {
        const newPollingStations = {};
        const newAdminDistricts = new Set(adminDistricts);
        const newElectoralDistricts = new Set(electoralDistricts);
        const newPollingDistricts = new Set(pollingDistricts);

        Object.entries(jsonData).forEach(([adminDistrict, electoralDistrictsData]) => {
            newAdminDistricts.add(adminDistrict);
            Object.entries(electoralDistrictsData).forEach(([electoralDistrict, pollingDistrictsData]) => {
                newElectoralDistricts.add(electoralDistrict);
                Object.entries(pollingDistrictsData).forEach(([pollingDistrict, stations]) => {
                    newPollingDistricts.add(pollingDistrict);
                    if (!newPollingStations[pollingDistrict]) {
                        newPollingStations[pollingDistrict] = [];
                    }
                    newPollingStations[pollingDistrict].push(...stations);
                });
            });
        });

        setAdminDistricts(Array.from(newAdminDistricts));
        setElectoralDistricts(Array.from(newElectoralDistricts));
        setPollingDistricts(Array.from(newPollingDistricts));
        setPollingStations(prevStations => ({
            ...prevStations,
            ...newPollingStations
        }));
    }, [adminDistricts, electoralDistricts, pollingDistricts]);

    const getDistrictHierarchy = () => {
        const hierarchy = [];

        Object.entries(districtsData).forEach(([adminDistrict, electoralDistrictsObj]) => {
            Object.entries(electoralDistrictsObj).forEach(([electoralDistrict, pollingDistrictsArr]) => {
                console.log("------->>>>", pollingDistrictsArr, "++++++++++++++")
                pollingDistrictsArr.forEach(pollingDistrict => {
                    hierarchy.push({
                        adminDistrict,
                        electoralDistrict,
                        pollingDistrict
                    });
                });
            });
        });

        return hierarchy;
    };

    const handleElectoralDistrictChange = useCallback((electoralDistrict) => {
        setSelectedElectoralDistrict(electoralDistrict);
        setPollingDistricts(districtsData[selectedAdminDistrict][electoralDistrict] || []);
        setSelectedPollingDistrict('');
    }, [selectedAdminDistrict]);

    const handlePollingDistrictChange = useCallback((pollingDistrict) => {
        setSelectedPollingDistrict(pollingDistrict);
    }, []);

    const addPollingStation = useCallback((district, name = '', coordinates = '') => {
        setPollingStations(prev => ({
            ...prev,
            [district]: [...(prev[district] || []), { name, coordinates }]
        }));
    }, []);

    const deletePollingStation = useCallback((district, index) => {
        setPollingStations(prev => ({
            ...prev,
            [district]: prev[district].filter((_, i) => i !== index)
        }));
    }, []);

    const handlePollingStationNameChange = useCallback((district, index, name) => {
        setPollingStations(prev => ({
            ...prev,
            [district]: prev[district].map((station, i) =>
                i === index ? { ...station, name } : station
            )
        }));
    }, []);

    const updatePollingStationCoordinates = useCallback((district, index, coordinates) => {
        setPollingStations(prev => ({
            ...prev,
            [district]: prev[district].map((station, i) =>
                i === index ? { ...station, coordinates } : station
            )
        }));
    }, []);

    return (
        <PollingStationsContext.Provider
            value={{
                adminDistricts,
                selectedAdminDistrict,
                electoralDistricts,
                selectedElectoralDistrict,
                pollingDistricts,
                selectedPollingDistrict,
                pollingStations,
                handleAdminDistrictChange,
                handleElectoralDistrictChange,
                handlePollingDistrictChange,
                addPollingStation,
                deletePollingStation,
                handlePollingStationNameChange,
                updatePollingStationCoordinates,
                handleBulkUpload,
                getDistrictHierarchy
            }}
        >
            {children}
        </PollingStationsContext.Provider>
    );
};