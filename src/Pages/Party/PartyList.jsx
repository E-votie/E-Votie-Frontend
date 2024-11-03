import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, InputAdornment, TextField  } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import PartyCard from '../../Components/PartyCard';
import { motion } from 'framer-motion';
import KeycloakService from '../../services/KeycloakService';

export const PartyList = () => {
  const navigate = useNavigate();
  const [partyList, setPartyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state properly

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/party');
        console.error(response.data);
        setPartyList(response.data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    };

    fetchParties();

    // Check if the user is logged in (keycloak service)
    setIsLoggedIn(KeycloakService.isLoggedIn());

    // Cleanup on component unmount
    return () => {
      setPartyList([]);
    };
  }, []);

  const openPartyRegistration = () => {
    navigate('/party/registration');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter parties based on search input
  const filteredParties = partyList.filter(party =>
    party.partyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate filtered parties into verified and pending approval
  const verifiedParties = filteredParties.filter(party => party.status === "verified");
  const pendingParties = filteredParties.filter(party => party.status === "pending verification");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[600px] flex flex-col bg-base-100 rounded-xl shadow-lg px-6 pb-6 gap-6"
    >
      <div className='flex flex-col'>
        {/* Header */}
        <header className='my-6 flex justify-between items-center'>
          <div className='text-3xl font-semibold text-gray-900'>
            Recognized Parties
          </div>
          {isLoggedIn && (
            <Button
              variant="contained"
              onClick={openPartyRegistration}
              startIcon={<GroupAddIcon />}
              sx={{
                backgroundColor: 'rgb(236 72 153)',
                color: '#fff',
                '&:hover': { 
                  backgroundColor: 'rgb(220 57 138)'
                }
              }}
            >
              Register New Party
            </Button>
          )}
        </header>

        {/* Party List */}
        <main className='flex flex-col md:flex-row gap-12 w-full'>
          <section className='flex-1 w-full'>
            {/* Search bar */}
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              variant="outlined"
              className="mb-3 w-full md:w-auto"
            />

            {/* Verified Parties */}
            <div className="flex flex-wrap gap-4 w-full">
              {verifiedParties.map((party) => (
                <motion.div
                  key={party.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <PartyCard party={party} state="verified" />
                </motion.div>
              ))}
            </div>

            <Box my={6} />
            
            {/* Pending Approval Section */}
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Pending Approval
            </Typography>
            <Divider />
            <Box my={2} />

            <div className="flex flex-wrap gap-4">
              {pendingParties.map((party) => (
                <motion.div
                  key={party.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <PartyCard party={party} state="pending verification" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Party Statistics */}
          <aside className='w-full md:w-1/3'>
            <TableContainer component={Paper} elevation={3}>
              <Table size="small" aria-label="party statistics">
                <TableHead>
                  <TableRow>
                    <TableCell className='font-bold'>Party</TableCell>
                    <TableCell align="right" className='font-bold'>No. Of MPs</TableCell>
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
        </main>
      </div>
    </motion.div>
  );
};

export default PartyList;


// Importing images
import unpImage from '../../assets/unp.png';
import slppImage from '../../assets/slpp.jpg';

// Sample party data
// const partyList = [
//   {
//     id: "1",
//     partyName: "United National Party",
//     abbreviation: "(UNP)",
//     leader: "Mr. Ranil Wickremesinghe",
//     secretary: "Mr. Akila Viraj Kariyawasam",
//     image: unpImage,
//     noOfMPs: 2
//   },
//   {
//     id: "2",
//     partyName: "Sri Lanka Podujana Peramuna",
//     abbreviation: "(SLPP)",
//     leader: "Mr. Mahinda Rajapaksha",
//     secretary: "Mr. Sagara Kariyawasam",
//     image: slppImage,
//     noOfMPs: 152
//   }
// ];