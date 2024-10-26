import React, {useEffect, useState} from 'react';
import ElectionCard from "../../Components/ElectionCard.jsx";
import {ElectionRegistrationForm} from "./ElectionRegistrationForm.jsx";
import {Divider} from "@mui/material";


const elections = [
    {
        title: "President Election 2024",
        enrollLink: "2024",
        description: "A presidential election is when people in a country vote to choose their leader, the President. Candidates announce they want to run, campaign to share their ideas, and try to convince people to vote for them. On Election Day, everyone who is allowed to vote picks the candidate they like best. The candidate with the most votes wins and becomes the President. This process helps decide who will lead the country and make important decisions.",
        image: "https://elections.gov.lk/7.jpg",
        Timeline: [
            {
                "label": "Announce Candidacy",
                "description": "Candidates publicly declare their intention to run for office and begin forming their campaign teams."
            },
            {
                "label": "Campaign Strategy Planning",
                "description": "Candidates and their teams develop a comprehensive plan outlining key messages, target demographics, and strategies for voter engagement."
            },
            {
                "label": "Fundraising",
                "description": "Candidates hold events and seek donations to finance their campaign activities, including advertising, travel, and staff salaries."
            },
            {
                "label": "Voter Outreach",
                "description": "Campaign teams engage with voters through various methods such as door-to-door canvassing, phone banking, and attending community events."
            },
            {
                "label": "Debates and Public Appearances",
                "description": "Candidates participate in debates and public forums to present their platforms and answer questions from voters and the media."
            },
            {
                "label": "Advertising",
                "description": "Campaigns launch advertising efforts across multiple platforms, including TV, radio, social media, and print, to reach a wider audience."
            },
            {
                "label": "Get Out the Vote (GOTV)",
                "description": "In the final days before the election, campaigns focus on ensuring that their supporters turn out to vote through reminders, rides to polling stations, and other assistance."
            },
            {
                "label": "Election Day",
                "description": "Voters cast their ballots at polling stations or through mail-in voting, and the results are tallied and announced."
            },
            {
                "label": "Post-Election Analysis",
                "description": "Candidates and their teams analyze the election results, assess the effectiveness of their campaign strategies, and prepare for any necessary next steps, such as recounts or runoff elections."
            }
        ]
    }
];

const ElectionCards = elections.map((election, index) => (
    <div key={index}>
        <ElectionCard
            image={election.image}
            description={election.description}
            EnrollLink={election.enrollLink}
            TimeLine={election.Timeline}
            Special={""}
            Title={election.title}
        />
    </div>
));

export const ElectionRegistration = () => {
    return(
        <div className="card bg-base-100 shadow-xl h-full p-5 flex flex-row gap-10">
            {ElectionCards}
            <Divider orientation="vertical" flexItem />
            <div className="w-4/6">
                <ElectionRegistrationForm/>
            </div>
        </div>
    )
}