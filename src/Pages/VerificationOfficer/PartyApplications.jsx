import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataProvider } from '../../services/TableDataContext.jsx';
import ColumnGroupingTable from '../../Components/Table.jsx';
import KeycloakService from "../../services/KeycloakService.jsx";
import { PartyApplicationsList } from '../../Components/PartyApplicationsList.jsx';
const partyUrl = import.meta.env.VITE_API_PARTY_URL;
export const PartyApplications = () => {
    const [partyList, setPartyList] = useState([]);

    useEffect(() => {
        const fetchPartyList = async () => {
            try {
                const updatedToken = KeycloakService.getToken();
                const response = await axios.get(`${partyUrl}/api/party/all`, {
                    headers: {
                        Authorization: `Bearer ${updatedToken}`
                    }
                });
                console.log(response);
                if ([200, 201].includes(response.status)) {
                    setPartyList(response.data); 
                    console.log(response.data); 
                } else {
                    alert("Error loading party list");
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchPartyList();
    }, []);

    return (
        <DataProvider link={"/verification_officer/get_voter_applications"} tableData={partyList}>
            <ColumnGroupingTable link={"/verification_officer/form_review/"} topic={"fsdf"}/>
            <PartyApplicationsList topic={"Party List"} partyData={partyList} />
        </DataProvider>
    );
};

