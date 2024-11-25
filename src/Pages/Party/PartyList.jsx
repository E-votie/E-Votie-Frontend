import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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

export const PartyList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [partyList, setPartyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userParty, setUserParty] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(null);

  // Calculate verified parties once when partyList changes
  const verifiedParties = partyList.filter(party => party.state === 'verified');
  const hasVerifiedParties = verifiedParties.length > 0;

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
            setUserParty(userPartyResponse.data.party);
          } catch (error) {
            console.error('Error fetching user party data:', error);
            setUserParty(null);
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

  const renderVerifiedParties = () => (
    <Box sx={{ mb: 3 }} className="w-full">
      {hasVerifiedParties ? (
        verifiedParties.map(party => (
          <div key={party.registrationId}>
            <PartyCard party={party} state="verified" />
          </div>
        ))
      ) : (
        <div>
          <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
            No verified parties found
          </Typography>
        </div>
      )}
    </Box>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[600px] flex flex-col bg-base-100 rounded-xl shadow-lg px-6 pb-6 gap-6"
    >
      {/* Header and Search Bar */}
      <div className="header my-8 flex justify-between items-center">
        <div className="text-3xl font-semibold text-gray-900 flex justify-between">Registered Parties</div>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Tabs */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
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
      {!loading && (
        <>
          {isLoggedIn && activeTab === 0 && (
            <Box sx={{ mb: 3 }} className="w-full">
              {userParty ? (
                <div className='flex justify-between'>
                  <div className='w-1/2'>
                    <PartyCard party={userParty} state="pending verification" viewMode="application" />
                  </div>
                  <aside className="w-full md:w-1/3">
                    <TableContainer component={Paper} elevation={3}>
                      <Table size="small" aria-label="party statistics">
                        <TableHead>
                          <TableRow>
                            <TableCell className="font-bold">Party</TableCell>
                            <TableCell align="right" className="font-bold">
                              No. Of MPs
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {partyList.map((party) => (
                            <TableRow key={party.id}>
                              <TableCell>{party.partyName}</TableCell>
                              <TableCell align="right">{party.noOfMPs}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </aside>
                </div>
              ) : (
                <Card>
                  <CardContent>
                    <Typography variant="h6">No Party Association</Typography>
                    <Typography color="text.secondary">You are not currently associated with any political party.</Typography>
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
          
          {(!isLoggedIn || activeTab === 1) && 
          
            <Box sx={{ mb: 3 }} className="w-full">
              {hasVerifiedParties ? (
                verifiedParties.map(party => (
                  <div className='flex justify-between' key={party.registrationId}>
                    <div className='w-1/2'>
                      <PartyCard party={party} state="verified" viewMode="public" />
                    </div>
                    <aside className="w-full md:w-1/3">
                      <TableContainer component={Paper} elevation={3}>
                        <Table size="small" aria-label="party statistics">
                          <TableHead>
                            <TableRow>
                              <TableCell className="font-bold">Party</TableCell>
                              <TableCell align="right" className="font-bold">
                                No. Of MPs
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {partyList.map((party) => (
                              <TableRow key={party.id}>
                                <TableCell>{party.partyName}</TableCell>
                                <TableCell align="right">{party.noOfMPs}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </aside>
                  </div>
                ))
              ) : (
                <div>
                  <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                    No verified parties found
                  </Typography>
                </div>
              )}
            </Box>
            
          }
        </>
      )}
    </motion.div>
  );
};