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

const ActionCard = ({icon, action, description, link, role}) => {
    const navigate = useNavigate();
    //Add navigate links in the home page not hear
    return (
        shouldShowCard(role) && (
            <Card sx={{ width: 218 }} onClick={() => navigate(link)}>
                <CardActionArea>
                    <div className="flex justify-center items-center my-2">
                        {getIcon(icon)}
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" className="flex justify-center items-center">
                            {action}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    );
};

export default ActionCard;
