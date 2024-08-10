// import React from 'react';
// import PartyCard from '../../Components/PartyCard';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Typography from '@mui/material/Typography';
// import PageviewIcon from '@mui/icons-material/Pageview';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// // Importing images
// import unpImage from '../../assets/unp.png';
// import slppImage from '../../assets/slpp.jpg';
// import { Box, Divider } from '@mui/material';

// const partyList = [
//   {
//     id: "1",
//     partyName: "United National Party",
//     abbreviation: "(UNP)",
//     leader: "Mr. Ranil Wickremesinghe",
//     secretary: "Mr. Akila Viraj Kariyawasam",
//     image: unpImage,  // Updated to use the imported image
//     noOfMPs: 2
//   },
//   {
//     id: "2",
//     partyName: "Sri Lanka Podujana Peramuna",
//     abbreviation: "(SLPP)",
//     leader: "Mr. Mahinda Rajapaksha",
//     secretary: "Mr. Sagara Kariyawasam",
//     image: slppImage,  // Updated to use the imported image
//     noOfMPs: 152
//   }
// ];

// export const PartyList = () => {
//   const navigate = useNavigate();
//   const [parties, setParties] = useState([]);

//   useEffect(() => {
//     const fetchParties = async () => {
//       try {
//         const response = await axios.get('http://localhost:5003/api/party'); // Replace with your API endpoint
//         setParties(response.data);
//       } catch (error) {
//         console.error('Error fetching parties:', error);
//       }
//     };

//     fetchParties();
//   }, []);

//   const openPartyRegistration = () => {
//     navigate('/party/registration');
//   };

//   return (
//     <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
//       <div className='partyListcontainer'>
//         {/* Header */}
//         <div className='header my-8 flex justify-between items-center'>
//           {/* Topic */}
//           <div className="topic text-3xl">
//               Recognized Parties
//           </div>
//           {/* Publish new announcement */}
//           <div className=''>
//             <Button
//               variant="outlined"
//               onClick={openPartyRegistration}
//               startIcon={<GroupAddIcon />}
//               sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
//             >
//               Register New Party
//             </Button>
//           </div>
//         </div>
//         <div className='flex gap-12'>
//           <div className='w-3/5 leftContainer'>
//             {/* search bar */}
//             <label className="input input-bordered flex items-center gap-2 mb-6 h-8">
//               <input type="text" className="grow input-xs" placeholder="Search" />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//                 className="h-4 w-4 opacity-70">
//                 <path
//                   fillRule="evenodd"
//                   d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//                   clipRule="evenodd" />
//               </svg>
//             </label>
//             {/* list of registered parties */}
//             <div className="flex flex-wrap gap-4">
//               {partyList.map((party, index) => (
//                 <PartyCard key={index} party={party} state="verified" />
//               ))}
//             </div>
//             <Box my={6} />
//             {/* list of pending verification parties */}
//             <div>
//               <Typography variant="h6" color="textSecondary" gutterBottom>
//                 Pending Approval
//               </Typography>
//               <Divider />

//               <Box my={2} />
//               <div className="flex flex-wrap gap-4">
//                 {parties.map((party, index) => (
//                   <PartyCard key={index} party={party} state="pending verification" />
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className='rightContainer w-2/5'>
//             <TableContainer component={Paper}>
//               <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Party</TableCell>
//                     <TableCell align="right">No. Of MPs</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {partyList.map((party) => (
//                     <TableRow
//                       key={party.name}
//                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                     >
//                       <TableCell component="th" scope="row">
//                         {party.partyName}
//                       </TableCell>
//                       <TableCell align="right">{party.noOfMPs}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

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
const partyList = [
  {
    id: "1",
    partyName: "United National Party",
    abbreviation: "(UNP)",
    leader: "Mr. Ranil Wickremesinghe",
    secretary: "Mr. Akila Viraj Kariyawasam",
    image: unpImage,
    noOfMPs: 2
  },
  {
    id: "2",
    partyName: "Sri Lanka Podujana Peramuna",
    abbreviation: "(SLPP)",
    leader: "Mr. Mahinda Rajapaksha",
    secretary: "Mr. Sagara Kariyawasam",
    image: slppImage,
    noOfMPs: 152
  }
];

export const PartyList = () => {
  const navigate = useNavigate();
  const [parties, setParties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/party');
        setParties(response.data);
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
              {parties.map((party) => (
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
