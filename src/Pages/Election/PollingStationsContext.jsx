import React, { createContext, useState } from 'react';

export const PollingStationsContext = createContext();

export const PollingStationsProvider = ({ children }) => {
    const [pollingStations, setPollingStations] = useState([
        { electionDistrict: "", name: "", coordinates: "" },
    ]);
    const { electionDistricts, addElectionDistrict } = useState(null);
    const [newDistrict, setNewDistrict] = useState('');

    const addPollingStation = (district) => {
        setPollingStations((prevStations) => [
            ...prevStations,
            { electionDistrict: district, name: "", coordinates: "" },
        ]);
    };

    const deletePollingStation = (index, district) => {
        if (pollingStations.length > 1) {
            setPollingStations((prevStations) =>
                prevStations.filter((_, i) => i !== index)
            );
        } else {
            // Show a warning message or handle the case where the last polling station cannot be deleted
        }
    };

    const handlePollingStationNameChange = (index, value, district) => {
        setPollingStations((prevStations) => {
            const updatedStations = [...prevStations];
            const stationIndex = updatedStations.findIndex(
                (station) => station.electionDistrict === district && station.name === prevStations[index].name
            );
            updatedStations[stationIndex].name = value;
            return updatedStations;
        });
    };

    return (
        <PollingStationsContext.Provider
            value={{
                pollingStations,
                setPollingStations,
                addPollingStation,
                deletePollingStation,
                handlePollingStationNameChange,
                electionDistricts,
                addElectionDistrict,
                newDistrict,
                setNewDistrict,
            }}
        >
            {children}
        </PollingStationsContext.Provider>
    );
};