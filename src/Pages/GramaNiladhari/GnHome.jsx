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
        "action": "Voter Applications",
        "icon": "application",
        "description": "Pending applications for verification.",
        "link": "/GN/voter_applications",
        "roles": ["GramaNiladhari"],
    },
    {
        "action": "Candidates Application",
        "icon": "candidate",
        "description": "Candidate.",
        "roles": ["GramaNiladhari"]
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
];

const shouldShowCard = (roles) => {
    if (roles.includes("ALL")) return true;
    if (roles.includes("Anonymous") && !keycloakService.isLoggedIn()) return true;
    if (keycloakService.isLoggedIn()) {
        return roles.some(role => KeycloakService.hasRole(role));
    }
    return false;
};


export const GnHome = () => {

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
                <motion.h1
                    className={`text-2xl font-bold mb-2 transition-opacity duration-500 opacity-100`}
                    initial={{y: -20}}
                    animate={{y: 0}}
                    transition={{duration: 0.5}}
                >
                    GN District - {GnDistrict}
                </motion.h1>
            </div>
            <Divider/>
            <div className="flex flex-row justify-between">
                <div
                    className="w-[350px] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-row justify-between items-start gap-5 border border-gray-300">
                    <div className="flex flex-col p-0 m-0">
                        <EmojiPeopleIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                        <div className="flex flex-row h-fit">
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '15px', fontWeight: '700'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            height: '21px',
                                            width: '120px'
                                        }}
                            >
                                Total Voters
                            </Typography>
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '12px', fontWeight: '500'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            height: '21px'
                                        }}
                            >
                                in {GnDistrict}
                            </Typography>
                        </div>
                        <CountingEffect value={TotalVoters} textSize={'.9rem'} duration={1000}/>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <PercentageCountingEffect value={12.5} textSize={'15px'}
                                                      duration={100}/>
                            <ArrowCircleUpIcon className="text-green-500 mb-4"
                                               style={{fontSize: 20, marginLeft: '5px'}}/>
                        </div>
                    </div>
                </div>
                <div
                    className="w-[350px] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-row justify-between items-start gap-5 border border-gray-300">
                    <div className="flex flex-col p-0 m-0">
                        <EmojiPeopleIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                        <div className="flex flex-row h-fit">
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '15px', fontWeight: '700'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            height: '21px',
                                            width: '120px'
                                        }}
                            >
                                Eligible Voters
                            </Typography>
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '12px', fontWeight: '500'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            height: '21px'
                                        }}
                            >
                                in {GnDistrict}
                            </Typography>
                        </div>
                        <CountingEffect value={EligibleVoters} textSize={'.9rem'} duration={1000}/>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <PercentageCountingEffect value={12.5} textSize={'15px'}
                                                      duration={100}/>
                            <ArrowCircleUpIcon className="text-green-500 mb-4"
                                               style={{fontSize: 20, marginLeft: '5px'}}/>
                        </div>
                    </div>
                </div>
                <div
                    className="w-[350px] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-row justify-between items-start gap-5 border border-gray-300">
                    <div className="flex flex-col p-0 m-0">
                        <EmojiPeopleIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                        <div className="flex flex-row h-fit">
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '15px', fontWeight: '700'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            height: '21px',
                                            width: '120px'
                                        }}
                            >
                                New Voters
                            </Typography>
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '12px', fontWeight: '500'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            height: '21px'
                                        }}
                            >
                                in {GnDistrict}
                            </Typography>
                        </div>
                        <CountingEffect value={NewVoters} textSize={'.9rem'} duration={1000}/>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <PercentageCountingEffect value={12.5} textSize={'15px'}
                                                      duration={100}/>
                            <ArrowCircleUpIcon className="text-green-500 mb-4"
                                               style={{fontSize: 20, marginLeft: '5px'}}/>
                        </div>
                    </div>
                </div>
                <div
                    className="w-[350px] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-row justify-between items-start gap-5 border border-gray-300">
                    <div className="flex flex-col p-0 m-0">
                        <EmojiPeopleIcon className="text-pink-500 mb-4" style={{fontSize: 30}}/>
                        <div className="flex flex-row h-fit">
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '15px', fontWeight: '700'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            height: '21px',
                                            width: '120px'
                                        }}
                            >
                                Pending legal cases
                            </Typography>
                            <Typography className="text-gray-800 font-bold text-center mb-2"
                                        sx={{fontSize: '12px', fontWeight: '500'}}
                                        style={{
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            height: '21px'
                                        }}
                            >
                                in {GnDistrict}
                            </Typography>
                        </div>
                        <div className="flex justify-end mr-12">
                            <CountingEffect value={PendingLegal} textSize={'.9rem'} duration={1000}/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <PercentageCountingEffect value={12.5} textSize={'15px'}
                                                      duration={100}/>
                            <ArrowCircleUpIcon className="text-green-500 mb-4"
                                               style={{fontSize: 20, marginLeft: '5px'}}/>
                        </div>
                    </div>
                </div>
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


export default GnHome;