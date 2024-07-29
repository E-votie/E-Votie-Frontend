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

const candidates = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
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

      {/* Cover Image */}
      <div className="relative">

        <img
          src="..\src\assets\politician-bg.png"
          alt="Cover"
          className="w-full h-64 object-cover"
        />

        {/* Party Symbol */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-white border-4 border-gray-300 rounded-full overflow-hidden">
          <img
            src="..\src\assets\slpp.jpg"
            alt="Party Symbol"
            className="w-full h-full object-cover"
          />

        </div>

      </div>

      {/* Party Info */}
      <div className="mt-16 text-center">

        {/* Party Name */}
        <h1 className="text-4xl font-bold">Sri Lanka Podujana Peramuna (SLPP)</h1>

        {/* Party Information */}
        <p className="mt-2 text-gray-600">
          <span className="mr-4">📍 Location</span>
          <span className="mr-4">📞 0712777639, 0112518565</span>
          <span>📧 info@slpp.org</span>
          <span className="ml-4">🌐 slpp.org</span>
        </p>

      </div>

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
          <Divider />

          <div className="flex lg:flex-row-reverse sm:flex-col xs:flex-col-reverse gap-12 py-4 mt-4">

            {/* Party Information */}
            <div className="partyDetailsContainer lg:w-3/5 sm:w-full">
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
                  <Politician key={index} />
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

