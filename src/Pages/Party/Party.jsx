import React from 'react';
import { Politician } from '../../Components/PoliticianCard';
import Divider from '@mui/material/Divider';
import { PartyDetails } from '../../Components/PartyDetails';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';
import { EditPartyInfo } from '../../Components/EditPartyInfo';
import {PartyMemberSideBar} from '../../Components/PartyMemberSideBar';
import { styled } from '@mui/system';
import { Card, CardContent, Avatar, InputAdornment, TextField } from '@mui/material';

const candidates = [
  {
    name: 'Mahinda Rajapaksa',
    profilePicture: '/src/assets/mr.jpg',
    description: 'Former President and Prime Minister of Sri Lanka, serving as a Member of Parliament for Kurunegala GeoData.'
  },
  {
    name: 'Gotabaya Rajapaksa',
    profilePicture: '/src/assets/gr.jpg',
    description: 'Former President of Sri Lanka, previously served as the Minister of Defence and Urban Development.'
  },
  {
    name: 'Basil Rajapaksa',
    profilePicture: '/src/assets/br.jpg',
    description: 'Founder and National Organizer of the SLPP, serving as a Member of Parliament for Gampaha GeoData.'
  },
  {
    name: 'Namal Rajapaksa',
    profilePicture: '/src/assets/nr.jpg',
    description: 'Minister of Youth and Sports, serving as a Member of Parliament for Hambantota GeoData.'
  },
  {
    name: 'Chamal Rajapaksa',
    profilePicture: '/src/assets/cr.jpg',
    description: 'Former Speaker of the Parliament of Sri Lanka, serving as a Member of Parliament for Hambantota GeoData.'
  },
  {
    name: 'Dinesh Gunawardena',
    profilePicture: '/src/assets/dr.jpg',
    description: 'Current Prime Minister of Sri Lanka, serving as a Member of Parliament for Colombo GeoData.'
  }
];

const requestList = [
  {
    name: "Namal Rajapaksha",
    requestStatus: "",
    profilePicture: "",
  },
  {
    name: "Gotabaya Rajapaksha"

  },
  {
    name: "Basil Rajapaksha"

  },
  {
    name: "Yoshitha Rajapaksha"

  },
  {
    name: "Chamal Rajapaksha"

  },
];

const party = {
  partyName: "Sri Lanka Podujana Peramuna",
  abbreviation: "SLPP",
  logo: "https://pbs.twimg.com/profile_images/1042605472249864192/P8mqmZXX_400x400.jpg",
  leader: "Mahinda Rajapaksa",
  secretary: "Sagara Kariyawasam",
  foundedYear: 2016,
  headquarters: {
    address: "No. 1316, Podujana Peramuna, Jayanthipura, Nelum Mawatha, Battaramulla 10120, Sri Lanka",
    contactNumber: "+94112866010",
  },
  colors: ["Red", "Blue", "Green"],
  seatsInParliament: {
    districtBasisSeats: 128,
    nationalBasisSeats: 17,
    totalSeats: 145,
  },
  website: "http://www.slpp.lk",
};

const CoverImage = styled('div')({
  height: 300,
  backgroundImage: 'url("../src/assets/politician-bg.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
});

const PartyLogo = styled(Avatar)({
  width: 150,
  height: 150,
  border: '4px solid #fff',
  position: 'absolute',
  bottom: -75,
  left: '50%',
  transform: 'translateX(-50%)',
});

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
  '&:hover': {
    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
  },
}));

export const Party = () => {
  const [openEditPartyInfoModal, setOpenEditPartyInfoModal] = React.useState(false);

  const handleOpenEditPartyInfoModal = () => {
    setOpenEditPartyInfoModal(true);
  };

  const handleCloseEditPartyInfoModal = () => {
    setOpenEditPartyInfoModal(false);
  };

  return (
    <div className="min-h-[600px] flex flex-col bg-gray-100 shadow-2xl pb-4 rounded-lg">
      <CoverImage>
        <PartyLogo src="../src/assets/slpp.jpg" alt="Party Logo" />
      </CoverImage>

      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <div className="text-4xl font-bold">Sri Lanka Podujana Peramuna (SLPP)</div>
        <Typography variant="subtitle1" color="text.secondary">
          📍 Location | 📞 0712777639, 0112518565 | 📧 info@slpp.org | 🌐 slpp.org
        </Typography>
      </Box>

      {/* Summary Section */}
      <div className="mt-8 flex justify-center">
        <div className="bg-white rounded-lg py-8 px-4 w-[90%]">

          <div className="flex justify-around mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">17122</p>
              <p className="text-gray-600">No. of Individual MP Contributions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">152</p>
              <p className="text-gray-600">No. of MPs in Parliament</p>
            </div>
          </div>
          {/* <Divider /> */}

          <div className="py-4 mt-4">

            {/* Party Information */}
            <div className="partyDetailsContainer lg:w-full sm:w-full">
              <Box className="flex justify-between">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Party Info
                </Typography>
                <Tooltip title="Update Party Info" arrow>
                  <IconButton size="large" onClick={handleOpenEditPartyInfoModal} color='primary'>
                    <EditNoteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider />
              <Box my={2} />

              {/* Edit Party Info Modal */}
              {openEditPartyInfoModal && (
                <EditPartyInfo
                  open={openEditPartyInfoModal}
                  handleClose={handleCloseEditPartyInfoModal}
                  partyInfo={party}
                />
              )}

              <div className="partyInfo">
                <PartyDetails party={party} />
              </div>
            </div>

            {/* Set of Politicians */}
            <div className="politicianContainer">

              <Box className="flex justify-between">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Politicians
                </Typography>
                <PartyMemberSideBar requestList={requestList}/>
                {/* <MoreOverMenu options={options} /> */}
              </Box>
              <Divider />
              <Box my={2} />
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

              {/* Politician List */}
              <div className="flex flex-col gap-2">
                {candidates.map((candidate, index) => (
                  <Politician key={index} politician={candidate}/>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import { Politician } from '../../Components/PoliticianCard';
// import { PartyDetails } from '../../Components/PartyDetails';
// import { EditPartyInfo } from '../../Components/EditPartyInfo';
// import { PartyMemberSideBar } from '../../Components/PartyMemberSideBar';
// import { Box, Typography, IconButton, Tooltip, Divider, Card, CardContent, Avatar, InputAdornment, TextField } from '@mui/material';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled } from '@mui/system';

// const candidates = [
//   {
//     name: 'Mahinda Rajapaksa',
//     profilePicture: '/src/assets/mr.jpg',
//     description: 'Former President and Prime Minister of Sri Lanka, serving as a Member of Parliament for Kurunegala District.'
//   },
//   {
//     name: 'Gotabaya Rajapaksa',
//     profilePicture: '/src/assets/gr.jpg',
//     description: 'Former President of Sri Lanka, previously served as the Minister of Defence and Urban Development.'
//   },
//   {
//     name: 'Basil Rajapaksa',
//     profilePicture: '/src/assets/br.jpg',
//     description: 'Founder and National Organizer of the SLPP, serving as a Member of Parliament for Gampaha District.'
//   },
//   {
//     name: 'Namal Rajapaksa',
//     profilePicture: '/src/assets/nr.jpg',
//     description: 'Minister of Youth and Sports, serving as a Member of Parliament for Hambantota District.'
//   },
//   {
//     name: 'Chamal Rajapaksa',
//     profilePicture: '/src/assets/cr.jpg',
//     description: 'Former Speaker of the Parliament of Sri Lanka, serving as a Member of Parliament for Hambantota District.'
//   },
//   {
//     name: 'Dinesh Gunawardena',
//     profilePicture: '/src/assets/dr.jpg',
//     description: 'Current Prime Minister of Sri Lanka, serving as a Member of Parliament for Colombo District.'
//   }
// ];

// const requestList = [
//   {
//     name: "Namal Rajapaksha",
//     requestStatus: "",
//     profilePicture: "",
//   },
//   {
//     name: "Gotabaya Rajapaksha"

//   },
//   {
//     name: "Basil Rajapaksha"

//   },
//   {
//     name: "Yoshitha Rajapaksha"

//   },
//   {
//     name: "Chamal Rajapaksha"

//   },
// ];

// const party = {
//   partyName: "Sri Lanka Podujana Peramuna",
//   abbreviation: "SLPP",
//   logo: "https://pbs.twimg.com/profile_images/1042605472249864192/P8mqmZXX_400x400.jpg",
//   leader: "Mahinda Rajapaksa",
//   secretary: "Sagara Kariyawasam",
//   foundedYear: 2016,
//   headquarters: {
//     address: "No. 1316, Podujana Peramuna, Jayanthipura, Nelum Mawatha, Battaramulla 10120, Sri Lanka",
//     contactNumber: "+94112866010",
//   },
//   colors: ["Red", "Blue", "Green"],
//   seatsInParliament: {
//     districtBasisSeats: 128,
//     nationalBasisSeats: 17,
//     totalSeats: 145,
//   },
//   website: "http://www.slpp.lk",
// };

// const CoverImage = styled('div')({
//   height: 300,
//   backgroundImage: 'url("../src/assets/politician-bg.png")',
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   position: 'relative',
// });

// const PartyLogo = styled(Avatar)({
//   width: 150,
//   height: 150,
//   border: '4px solid #fff',
//   position: 'absolute',
//   bottom: -75,
//   left: '50%',
//   transform: 'translateX(-50%)',
// });

// const StyledCard = styled(Card)(({ theme }) => ({
//   margin: theme.spacing(2),
//   boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
//   '&:hover': {
//     boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
//   },
// }));

// export const Party = () => {
//   const [openEditPartyInfoModal, setOpenEditPartyInfoModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleOpenEditPartyInfoModal = () => setOpenEditPartyInfoModal(true);
//   const handleCloseEditPartyInfoModal = () => setOpenEditPartyInfoModal(false);

//   const filteredCandidates = candidates.filter(candidate =>
//     candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4 }}>
//       <CoverImage>
//         <PartyLogo src="../src/assets/slpp.jpg" alt="Party Logo" />
//       </CoverImage>

//       <Box sx={{ mt: 10, textAlign: 'center' }}>
//         <Typography variant="h3" gutterBottom>Sri Lanka Podujana Peramuna (SLPP)</Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           📍 Location | 📞 0712777639, 0112518565 | 📧 info@slpp.org | 🌐 slpp.org
//         </Typography>
//       </Box>

//       <StyledCard>
//         <CardContent>
//           <Box display="flex" justifyContent="space-around" mb={4}>
//             <Box textAlign="center">
//               <Typography variant="h4" color="primary">17122</Typography>
//               <Typography variant="body2" color="text.secondary">Individual MP Contributions</Typography>
//             </Box>
//             <Box textAlign="center">
//               <Typography variant="h4" color="primary">152</Typography>
//               <Typography variant="body2" color="text.secondary">MPs in Parliament</Typography>
//             </Box>
//           </Box>

//           <Divider />

//           <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4} mt={4}>
//             <Box flex={2}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h6" color="text.secondary">Politicians</Typography>
//                 <PartyMemberSideBar requestList={requestList} />
//               </Box>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Search politicians"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ mb: 2 }}
//               />
//               <Box display="flex" flexDirection="column" gap={2}>
//                 {filteredCandidates.map((candidate, index) => (
//                   <Politician key={index} politician={candidate} />
//                 ))}
//               </Box>
//             </Box>

//             <Box flex={1}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h6" color="text.secondary">Party Info</Typography>
//                 <Tooltip title="Update Party Info" arrow>
//                   <IconButton onClick={handleOpenEditPartyInfoModal} color="primary">
//                     <EditNoteIcon />
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//               <PartyDetails party={party} />
//             </Box>
//           </Box>
//         </CardContent>
//       </StyledCard>

//       <EditPartyInfo
//         open={openEditPartyInfoModal}
//         handleClose={handleCloseEditPartyInfoModal}
//         partyInfo={party}
//       />
//     </Box>
//   );
// };