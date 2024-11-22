import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
  Paper,
  InputBase,
  IconButton,
  Fade,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ClockIcon,
  Block as BanIcon,
  Warning as AlertIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import axios from 'axios';
import PartyCard from '../../Components/PartyCard';
import KeycloakService from '../../services/KeycloakService';
import { motion } from 'framer-motion';

// Helper function to render party status icons
const getStatusIcon = (status) => {
  switch (status) {
    case 'verified':
      return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    case 'pending verification':
      return <ClockIcon sx={{ color: 'warning.main' }} />;
    case 'banned':
      return <BanIcon sx={{ color: 'error.main' }} />;
    default:
      return <AlertIcon sx={{ color: 'grey.500' }} />;
  }
};

// SearchBar Component
const SearchBar = ({ searchTerm, onSearchChange }) => (
  <Paper
    elevation={3}
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: 400,
      borderRadius: '50px',
      px: 2,
      py: 0.5,
      backgroundColor: 'background.paper',
    }}
  >
    <IconButton sx={{ p: 1 }} aria-label="search">
      <SearchIcon sx={{ color: 'text.secondary' }} />
    </IconButton>
    <InputBase
      fullWidth
      placeholder="Search parties..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{
        ml: 1,
        flex: 1,
        '& .MuiInputBase-input': {
          py: 1,
          fontSize: '1rem',
          fontWeight: 500,
          '&::placeholder': {
            opacity: 0.7,
            fontWeight: 400,
          },
        },
      }}
    />
    <Fade in={searchTerm.length > 0}>
      <IconButton
        size="small"
        aria-label="clear search"
        onClick={() => onSearchChange('')}
        sx={{
          visibility: searchTerm.length > 0 ? 'visible' : 'hidden',
          opacity: searchTerm.length > 0 ? 1 : 0,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <ClearIcon fontSize="small" sx={{ color: 'text.secondary' }} />
      </IconButton>
    </Fade>
  </Paper>
);

// UserPartyCard Component
const UserPartyCard = ({ party, onViewDetails }) => (
  <Card sx={{ backgroundColor: '#e8f5e9', mb: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5">{party.partyName}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Founded: {party.foundedDate}
          </Typography>
        </Box>
        {getStatusIcon(party.status)}
      </Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
        Party Leader
      </Typography>
      <Typography>{party.leader}</Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
        Number of MPs
      </Typography>
      <Typography>{party.noOfMPs}</Typography>
    </CardContent>
    <CardActions>
      <Button variant="outlined" onClick={onViewDetails}>
        View Details
      </Button>
    </CardActions>
  </Card>
);

// Main Component
export const PartyList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [partyList, setPartyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userParty, setUserParty] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(null);
  const [verifiedPartyAvailability, setVerifiedPartyAvailability] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const loggedIn = KeycloakService.isLoggedIn();
        setIsLoggedIn(loggedIn);

        const token = KeycloakService.getToken();
        const partyResponse = await axios.get('http://localhost:5003/api/party/all');

        setPartyList(partyResponse.data);
        
        if (loggedIn) {
          try {
              const userPartyResponse = await axios.get(
                  'http://localhost:5003/api/party/member',
                  { headers: { Authorization: `Bearer ${token}` } }
              );
      
              if (userPartyResponse.data && userPartyResponse.data.length > 0) {
                  setUserParty(userPartyResponse.data);
              } else {
                  console.log('No parties associated with this user.');
                  setUserParty([]); // Set to an empty array or null, based on your preference
              }
          } catch (error) {
              console.error('Error fetching user party data:', error);
              setUserParty(null); // Handle API error gracefully
          }
      }
      
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load party data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="min-h-[600px] flex flex-col bg-base-100 rounded-xl shadow-lg px-6 pb-6 gap-6"
  >
      {/* Header and Search Bar */}
      <div className='header my-8 flex justify-between items-center'>
          {/* Topic */}
          <div className="text-3xl font-semibold text-gray-900 flex justify-between">
              Registered Parties
          </div>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>   

      {/* Tabs */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {isLoggedIn && <Tab label="My Party" />}
          <Tab label="Verified Parties" />
        </Tabs>
      </Paper>

      {/* Loading Spinner */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Tab Content */}
      {!loading && isLoggedIn && activeTab === 0 && (
        <Box sx={{ mb: 3 }}>
          {userParty ? (
            <UserPartyCard party={userParty} onViewDetails={() => navigate(`/party/${userParty.id}`)} />
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h6">No Party Association</Typography>
                <Typography color="text.secondary">
                  You are not currently associated with any political party.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={() => navigate('/party/registration')}>
                  Register a Party
                </Button>
              </CardActions>
            </Card>
          )}
        </Box>
      )}

      {!loading && !isLoggedIn && (
        <Grid container spacing={3}>
          {partyList.length > 0 ? (
            partyList.map((party) =>
              party.state === 'verified' ? (
                  <PartyCard party={party} state="verified" key={party.id}/>
              ) : null
            )
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                No verified parties found
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      {!loading && isLoggedIn && activeTab === 1 && (
        <Grid container spacing={3}>
          {partyList.length > 0 ? (
            partyList.map((party) =>
              party.state === 'verified' ? (
                setVerifiedPartyAvailability(true),
                <Grid item xs={12} sm={6} md={4} key={party.id}>
                  <PartyCard party={party} state="verified" />
                </Grid>
              ) : null 
            )
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                No verified parties found
              </Typography>
            </Grid>
          )}
          {  !verifiedPartyAvailability && <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                No verified parties found
              </Typography>
            </Grid>
          }
        </Grid>
      )}
    </motion.div>
  );
};
