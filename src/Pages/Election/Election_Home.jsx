import React, { useEffect, useState } from 'react';
import Carousel from '../../Components/Carousel';
import ActionCard from '../../Components/ActionCard';


const actions = [
    {
        "action": "Create Election",
        "icon": "create",
        "description": "Create a new election.",
        "Link" : "/Election/Create"
    },

    {
        "action": "Election Details",
        "icon": "election",
        "description": "General information about the elections."
    },
    {
        "action": "Dashboard",
        "icon": "dashboard",
        "description": "Information about the election candidates."
    },
    {
        "action": "Election Results",
        "icon": "results",
        "description": "View the election results."
    },
    {
        "action": "Announcements",
        "icon": "announcement",
        "description": "Latest announcements and updates."
    }
]

const messages = {
    en: "Welcome to our website!",
    si: "අපගේ වෙබ් අඩවියට සාදරයෙන් පිළිගනිමු!",
    ta: "எங்கள் வலைத்தளத்திற்கு வரவேற்கிறோம்!"
};

const languageOrder = ['en', 'si', 'ta'];

export const Election_Home = () => {
    const [language, setLanguage] = useState('en');
    const [fade, setFade] = useState(true);

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

    return (
        <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
            <div className="h-1/5 flex-grow flex flex-col justify-center items-center text-3xl text-center">
                <h1 className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    {messages[language]}
                </h1>
            </div>
            <div className="h-2/5 flex-grow flex flex-wrap gap-4 justify-center items-center ">
                {actions.map((action, index) => (
                    <ActionCard key={index} icon={action.icon} action={action.action} description={action.description} link={action.Link}  />
                ))}
            </div>
            <div className="h-[2/5] flex-grow flex flex-col justify-center items-center">
                <Carousel />
            </div>
        </div>
    );
};

