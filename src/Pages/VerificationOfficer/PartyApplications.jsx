import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        <div className="min-h-[600px] bg-base-100 shadow-md rounded-xl p-4">
            <div className="flex my-7 justify-center items-center bg-[#f8f8f8] h-[70px]">
                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AccountCircleIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20"></path></svg>
                <h2 className="ml-5">
                    Party Applications
                </h2>
            </div>
            <PartyApplicationsList partyData={partyList} />
        </div>

    );
};

