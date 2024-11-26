import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Carousel from '../../Components/Carousel';
import ActionCard from '../../Components/ActionCard';
import { useNavigate } from "react-router-dom";
import KeycloakService from "../../services/KeycloakService.jsx";
import { authGet } from "../../Auth/authFetch.jsx";
import keycloakService from "../../services/KeycloakService.jsx";

const actions = [
    {
        "action": "Verify Identity",
        "icon": "candidate",
        "description": "Verify voters hear.",
        "link": "/polling_station/voter_verify",
        "roles": ["pollingStation"]
    },
    {
        "action": "Poling station Details",
        "icon": "candidate",
        "description": "View your personal details and history hear",
        "link": "/voter/profile",
        "roles": ["pollingStation"]
    },
    {
        "action": "Get Token",
        "icon": "candidate",
        "description": "View your personal details and history hear",
        "link": "/voter/profile",
        "roles": ["pollingStation"]
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

const messages = {
    en: "Welcome to our Digital Democracy Platform!",
    si: "අපගේ ඩිජිටල් ප්‍රජාතන්ත්‍රවාදී වේදිකාවට සාදරයෙන් පිළිගනිමු!",
    ta: "எங்கள் டிஜிட்டல் ஜனநாயக தளத்திற்கு வரவேற்கிறோம்!"
};
const languageOrder = ['en', 'si', 'ta'];

export const PollingStationHome = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');
    const [fade, setFade] = useState(true);
    const [Status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setLanguage((prevLanguage) => {
                    const currentIndex = languageOrder.indexOf(prevLanguage);
                    const nextIndex = (currentIndex + 1) % languageOrder.length;
                    return languageOrder[nextIndex];
                });
                setFade(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (keycloakService.isLoggedIn() && KeycloakService.hasRole("Voter")) {
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 text-center">
                    <motion.h1
                        className={`text-2xl font-bold mb-2 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {messages[language]}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-xl"
                    >
                        Empowering citizens through digital democracy
                    </motion.p>
                    {(KeycloakService.hasRole("Voter") && Status !== "Completed") && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4 rounded-r"
                        >
                            <p className="font-bold">Action Required:</p>
                            <p>Your fingerprint is not registered. Please visit a designated office to complete registration.</p>
                        </motion.div>
                    )}
                </div>

                <div className="p-8">
                    {/*<h2 className="text-3xl font-semibold mb-6 text-gray-800">Quick Actions</h2>*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {actions.map((action, index) => (
                            shouldShowCard(action.roles) && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
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

                <div className="bg-gray-100 p-8 flex-grow justify-between">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Latest Updates</h2>
                    <center>
                        <Carousel />
                    </center>
                </div>
            </div>
        </motion.div>
    );
};