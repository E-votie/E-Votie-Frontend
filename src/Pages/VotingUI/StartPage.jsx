import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import CandidateListVoting from "../../Components/CandidateListVoting.jsx";

export const VotingPageStart = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-start justify-center pt-0">
            <div className="card bg-base-100 w-[1100px] shadow-xl h-[calc(95vh-2rem)]">
                <figure className="flex-grow">
                    <img
                        src="https://media.istockphoto.com/id/989948936/photo/flag-of-sri-lanka.jpg?s=612x612&w=0&k=20&c=8DcmNrmGh-ER6mxfs9-S17GEsQ31f4rNJVtpJsKQZJM="
                        alt="Shoes"
                        className="object-cover w-full h-full"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Presidential Election 2024</h2>
                    <p>Your voice matters. Cast your vote</p>
                    <div className="card-actions justify-end mt-auto">
                        <button className="btn btn-primary btn-lg" onClick={() => navigate("/voting_page")}>
                            Vote Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

