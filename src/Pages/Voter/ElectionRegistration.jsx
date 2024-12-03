import React, { useEffect, useState } from 'react';
import ElectionCard from "../../Components/ElectionCard.jsx";
import { ElectionRegistrationForm } from "./ElectionRegistrationForm.jsx";
import { Divider } from "@mui/material";
import { authGet } from "../../Auth/authFetch.jsx";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material'; // Import Material-UI CircularProgress for loading

const initialElections = [
    {
        title: "President Election 2024",
        enrollLink: "2024",
        description: "A presidential election is when people in a country vote to choose their leader, the President. Candidates announce they want to run, campaign to share their ideas, and try to convince people to vote for them. On Election Day, everyone who is allowed to vote picks the candidate they like best. The candidate with the most votes wins and becomes the President. This process helps decide who will lead the country and make important decisions.",
        image: "https://elections.gov.lk/7.jpg",
        Timeline: [
            {
                label: "Election Announcement",
                description: "Election commission announce the election date and the election process. on {data.electionStartDate}"
            },
            {
                label: "Election Voter Registration",
                description: "Voters register to vote in the upcoming election, ensuring that they are eligible to participate. from {data.electionVoterRegistrationStartDate} to {data.electionVoterRegistrationEndDate}"
            },
            {
                label: "Election Nomination Period",
                description: "Candidates apply for the election and submit their nomination papers. from {data.electionNominationCallingStartDate} to {data.electionNominationCallingEndDate}"
            },
            {
                label: "Candidate Campaign period",
                description: "Campaign teams engage with voters through various methods such as door-to-door canvassing, phone banking, and attending community events. From {data.electionCampaignStartDate} to {data.electionCampaignEndDate}"
            },
            {
                label: "Voting Day",
                description: "On election day, registered voters cast their ballots at polling stations. for {data.electionDayStartDate} to {data.electionDayEndDate}"
            },
            {
                label: "Result Announcement",
                description: "The election commission announces the results of the election. on {data.electionEndDate}"
            }
        ]
    }
];

const ElectionCards = ({ electionData }) => (
    <div>
        <ElectionCard
            image={electionData[0].image}
            description={electionData[0].description}
            EnrollLink={electionData[0].enrollLink}
            TimeLine={electionData[0].Timeline}
            Special={""}
            Title={electionData[0].title}
        />
    </div>
);

export const ElectionRegistration = () => {
    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const [electionData, setElectionData] = useState(initialElections);
    const navigate = useNavigate();
    const [electionID, setElectionID] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await authGet(`/election/get_election/Voter_Registration`);
                const fetchedData = response.data;

                // Log fetched data for debugging
                console.log("Fetched data:", fetchedData);
                setElectionID(fetchedData.id)
                setResponseData(fetchedData);

                // Replace the placeholders in the timeline with fetched data
                const updatedElections = initialElections.map(election => {
                    const updatedTimeline = election.Timeline.map(timelineItem => {
                        let updatedDescription = timelineItem.description;

                        // Replace all placeholders with fetched data
                        updatedDescription = updatedDescription.replace('{data.electionStartDate}', fetchedData.electionStartDate || 'N/A');
                        updatedDescription = updatedDescription.replace('{data.electionVoterRegistrationStartDate}', fetchedData.electionVoterRegistrationStartDate || 'N/A');
                        updatedDescription = updatedDescription.replace('{data.electionVoterRegistrationEndDate}', fetchedData.electionVoterRegistrationEndDate || 'N/A');
                        updatedDescription = updatedDescription.replace('{data.electionNominationCallingStartDate}', fetchedData.electionNominationCallingStartDate || 'N/A');
                        updatedDescription = updatedDescription.replace('{data.electionNominationCallingEndDate}', fetchedData.electionNominationCallingEndDate || 'N/A');
                        updatedDescription = updatedDescription.replace('{data.electionCampaignStartDate}', fetchedData.electionCampaignStartDate || 'N/A');
                        updatedDescription = updatedDescription.replace('{data.electionCampaignEndDate}', fetchedData.electionCampaignEndDate || 'N/A');
                        updatedDescription = updatedDescription.replace('{data.electionDayStartDate}', fetchedData.electionDayStartDate || 'N/A');
                        updatedDescription = updatedDescription.replace('{data.electionDayEndDate}', fetchedData.electionDayEndDate || 'N/A');
                        updatedDescription = updatedDescription.replace('{data.electionEndDate}', fetchedData.electionEndDate || 'N/A');

                        return {
                            ...timelineItem,
                            description: updatedDescription
                        };
                    });

                    return {
                        ...election,
                        Timeline: updatedTimeline
                    };
                });

                setElectionData(updatedElections);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <CircularProgress size={50} /> {/* Material UI loading spinner */}
            </div>
        );
    }

    return (
        <div className="card bg-base-100 shadow-xl h-full p-5 flex flex-row gap-10">
            <ElectionCards electionData={electionData} />
            <Divider orientation="vertical" flexItem />
            <div className="w-4/6">
                <ElectionRegistrationForm electionID={electionID}/>
            </div>
        </div>
    );
};
