import React, {useEffect} from 'react';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import {Divider, Link, Typography} from "@mui/material";
import CountingEffect from "../../Components/CountingEffect.jsx";
import PercentageCountingEffect from "../../Components/PercentageCountingEffect.jsx";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MiniCalendar from "../../Components/MiniCalendar.jsx";
import {motion} from "framer-motion";
import ActionCard from "../../Components/ActionCard.jsx";
import keycloakService from "../../services/KeycloakService.jsx";
import KeycloakService from "../../services/KeycloakService.jsx";
import {authGet} from "../../Auth/authFetch.jsx";

const actions = [
    {
        "action": "Voter Registration",
        "icon": "candidate",
        "description": "New voters register here.",
        "link": "/VoterRegistration",
        "roles": ["Anonymous"]
    },
    {
        "action": "My Details",
        "icon": "candidate",
        "description": "View your personal details and history hear",
        "link": "/voter/profile",
        "roles": ["Voter"]
    },
    {
        "action": "Verify Voter",
        "icon": "candidate",
        "description": "Verify voter details and history hear",
        "link": "/poling_station/voter_verification",
        "roles": ["pollingStation"]
    },
    {
        "action": "Election Registration",
        "icon": "candidate",
        "description": "eligible voter register for an election to vote",
        "link": "/voter/election_registration",
        "roles": ["Voter"]
    },
    {
        "action": "Voter Applications",
        "icon": "candidate",
        "description": "Pending applications for verification.",
        "link": "/verification_officer/voter_applications",
        "roles": ["VerificationOfficer"],
    },
    {
        "action": "Candidate Applications",
        "icon": "application",
        "description": "Pending applications for verification.",
        "link": "/verification_officer/candidate_applications",
        "roles": ["VerificationOfficer"],
    },
    {
        "action": "Voter Applications",
        "icon": "application",
        "description": "Pending applications for verification.",
        "link": "/GN/voter_applications",
        "roles": ["GramaNiladhari"],
    },
    {
        "action": "Party Applications",
        "icon": "application",
        "description": "Pending applications for verification.",
        "link": "/verification_officer/party_applications",
        "roles": ["VerificationOfficer"],
    },
    {
        "action": "Fingerprint Scan",
        "icon": "FingerprintIcon",
        "description": "Register new fingerprint or update",
        "link": "/verification_officer/fingerprint_scan",
        "roles": ["VerificationOfficer"]
    },
    {
        "action": "Party Details",
        "icon": "party",
        "description": "Details about the political parties.",
        "link": "/party/list",
        "roles": ["Anonymous", "Voter", "partyMember"]
    },
    {
        "action": "Candidates Application",
        "icon": "candidate",
        "description": "Candidate.",
        "roles": ["GramaNiladhari"]
    },
    {
        "action": "Elections",
        "icon": "election",
        "description": "General information about the elections.",
        "link": "/election/list",
        "roles": ["Anonymous", "Voter"]
    },
    {
        "action": "Inquiries",
        "icon": "inquiry",
        "description": "inquiries and complaints",
        "link": "/inquiries",
        "roles": ["GramaNiladhari"]
    },
    {
        "action": "Voters",
        "icon": "inquiry",
        "description": "Voters in GN District",
        "link": "/inquiries",
        "roles": ["GramaNiladhari"]
    },
    {
        "action": "Notifications",
        "icon": "inquiry",
        "description": "TO Dos",
        "link": "/inquiries",
        "roles": ["GramaNiladhari"]
    },
    {
        "action": "Inquiries",
        "icon": "inquiry",
        "description": "Submit your inquiries and complaints here.",
        "link": "/inquiries",
        "roles": ["Anonymous", "Voter"]
    },
    {
        "action": "Announcements",
        "icon": "announcement",
        "description": "Latest announcements and updates.",
        "link":"/announcements",
        "roles": ["Anonymous", "Voter"]
    },
    {
        "action": "Election Result",
        "icon": "announcement",
        "description": "Latest announcements and updates.",
        "link":"/election/result",
        "roles": ["Anonymous", "Voter"]
    },
];

const shouldShowCard = (roles) => {
    if (roles.includes("ALL")) return true;
    if (roles.includes("Anonymous") && !keycloakService.isLoggedIn()) return true;
    if (keycloakService.isLoggedIn()) {
        return roles.some(role => KeycloakService.hasRole(role));
    }
    return false;
};


export const VerificationHome = () => {

    const [GnDistrict, setGnDistrict] = React.useState("Nampanumuwa");
    const[Name , setName] = React.useState("Lahiru Jayathilake");
    const[TotalVoters , setTotalVoters] = React.useState(1281)
    const[EligibleVoters , setEligibleVoters] = React.useState(1135)
    const[NewVoters , setNewVoters] = React.useState(84)
    const[PendingLegal , setPendingLegal] = React.useState(2)

    useEffect(() => {
        const fetchData = async () => {
            if (keycloakService.isLoggedIn()) {
                try {
                    setLoading(true);
                    const data = await authGet(`/voter/status`);
                    setStatus(data.Status);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col bg-base-100 shadow-md rounded-xl p-6 pb-0 gap-8">
            <div className="flex flex-row justify-between">
                <motion.h1
                    className={`text-2xl font-bold mb-2 transition-opacity duration-500 opacity-100`}
                    initial={{y: -20}}
                    animate={{y: 0}}
                    transition={{duration: 0.5}}
                >
                    Welcome Mr. {Name}
                </motion.h1>
            </div>
            <Divider/>
            <div className="flex flex-row justify-between">
                <div className="">
                    {/*<h2 className="text-3xl font-semibold mb-6 text-gray-800">Quick Actions</h2>*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {actions.map((action, index) => (
                            shouldShowCard(action.roles) && (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.1, duration: 0.3}}
                                >
                                    <ActionCard
                                        icon={action.icon}
                                        action={action.action}
                                        description={action.description}
                                        link={action.link}
                                        role={action.roles}
                                    />
                                </motion.div>
                            )
                        ))}
                    </div>
                </div>
                <Divider orientation="vertical"/>
                <div className="bg-gray-100">
                    <MiniCalendar></MiniCalendar>
                </div>
            </div>
            <Divider/>
            <div>

            </div>
        </div>
    );
};


export default VerificationHome;