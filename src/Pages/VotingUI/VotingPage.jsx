import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import CandidateListVoting from "../../Components/CandidateListVoting.jsx";

export const VotingPage = () => {
    const navigate = useNavigate();

    const Candidates = [
        {
            "Name": "Ranil",
            "Color": "Green",
            "Symbol": "/url"
        },
        {
            "Name": "Anura",
            "Color": "Red",
            "Symbol": "/url"
        },
        {
            "Name": "Lahiru",
            "Color": "Blue",
            "Symbol": "/url"
        },
        {
            "Name": "Damith",
            "Color": "red",
            "Symbol": "/url"
        },
    ]

    return (
        <div className="card bg-base-100 shadow-xl h-full p-5 flex flex-row justify-center items-center">
            <CandidateListVoting candidates={Candidates}></CandidateListVoting>
        </div>
    );
};

