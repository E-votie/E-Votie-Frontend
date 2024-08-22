import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, InputAdornment, TextField } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import PartyCard from '../../Components/PartyCard';
import { motion } from 'framer-motion';

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

export const PartyList = () => {
  const navigate = useNavigate();
  const [partyList, setPartyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/party');
        setPartyList(response.data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    };

    fetchParties();
  }, []);

  const openPartyRegistration = () => {
    navigate('/party/registration');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredParties = partyList.filter(party =>
    party.partyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[600px] flex flex-col bg-base-100 rounded-xl shadow-lg px-6 pb-6 gap-6"
    >
      <div className='flex flex-col'>
        {/* Header */}
        <div className='my-6 flex justify-between items-center'>
          <div className='text-3xl font-semibold text-gray-900'>
            Recognized Parties
          </div>
          <Button
            variant="contained"
            onClick={openPartyRegistration}
            startIcon={<GroupAddIcon />}
            sx={{
              backgroundColor: 'rgb(236 72 153)', // Original pink color
              color: '#fff',
              '&:hover': { 
                  backgroundColor: 'rgb(220 57 138)' // Slightly darker pink color for hover
              }
          }}
            // sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
          >
            Register New Party
          </Button>
        </div>

        {/* Party List */}
        <div className='flex flex-col md:flex-row gap-12 w-full'>
          <div className='flex-1 w-full'>
            {/* search bar */}
            <label className="input input-bordered flex items-center gap-2 mb-3 h-8">
              <input type="text" className="grow input-xs" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>
            <div className="flex flex-wrap gap-4 w-full">
              {filteredParties.map((party) => (
                <motion.div
                  key={party.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <PartyCard party={party} state="verified" className="w-full"/>
                </motion.div>
              ))}
            </div>
            <Box my={6} />
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Pending Approval
            </Typography>
            <Divider />
            <Box my={2} />
            <div className="flex flex-wrap gap-4">
              {filteredParties.map((party) => (
                <motion.div
                  key={party.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <PartyCard party={party} state="pending verification" className="w-full"/>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Party Statistics */}
          <div className='w-full md:w-1/3'>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 250 }} size="small" aria-label="party statistics">
                <TableHead>
                  <TableRow>
                    <TableCell className='font-bold' sx={{fontWeight:"bold"}}>Party</TableCell>
                    <TableCell align="right" className='font-bold' sx={{fontWeight:"bold"}}>No. Of MPs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {partyList.map((party) => (
                    <TableRow
                      key={party.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {party.partyName}
                      </TableCell>
                      <TableCell align="right">{party.noOfMPs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PartyList;

