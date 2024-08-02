import * as React from 'react';
import { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import keycloakService from "../services/KeycloakService.jsx";
import KeycloakService from "../services/KeycloakService.jsx";
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const getIcon = (icon) => {
    switch (icon) {
        case "party":
            return <AccountBalanceIcon sx={{fontSize: 40}}/>;
        case "candidate":
            return <PersonIcon sx={{fontSize: 40}}/>;
        case "manifesto":
            return <DescriptionIcon sx={{fontSize: 40}}/>;
        case "election":
            return <HowToVoteIcon sx={{fontSize: 40}}/>;
        case "inquiry":
            return <ContactSupportIcon sx={{fontSize: 40}}/>;
        case "announcement":
            return <AnnouncementIcon sx={{fontSize: 40}}/>;
        case "application":
            return <ArticleIcon sx={{fontSize: 40}}/>;
        case "results":
            return <CampaignIcon sx={{ fontSize: 40 }} />;
        case "create":
            return <AddBoxIcon sx={{ fontSize:40}} />;
        case "dashboard":
            return <DashboardIcon sx={{ fontSize: 40 }} />;
        case "FingerprintIcon":
            return <FingerprintIcon sx={{ fontSize: 40 }} />;
        default:
            return <AnnouncementIcon sx={{ fontSize: 40 }} />; // Default icon
    }
};

const shouldShowCard = (roles) => {
    // Memoize the function to prevent unnecessary recalculations
    return useMemo(() => {
        if (roles.includes("ALL")) return true;
        if (roles.includes("Anonymous") && !keycloakService.isLoggedIn()) return true;
        if (keycloakService.isLoggedIn()) {
            return roles.some(role => KeycloakService.hasRole(role));
        }
        return false;
    }, [roles, keycloakService.isLoggedIn()]); // Dependencies array
};

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ActionCard = ({ icon, action, description, link, role }) => {
  return (
    shouldShowCard(role) && 
    <Link to={link}>
        <motion.div
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.95 }}
        >                    
            <div className="text-4xl mb-4 text-blue-500">
                {getIcon(icon)}
            </div>
            {/* <Icon className="text-4xl mb-4 text-blue-500" /> */}
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{action}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    </Link>
  );
};

export default ActionCard;

