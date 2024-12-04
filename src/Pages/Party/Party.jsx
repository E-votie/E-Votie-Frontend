import React, { useEffect, useState } from 'react';
import { Politician } from '../../Components/PoliticianCard';
import Divider from '@mui/material/Divider';
import { PartyDetails } from '../../Components/PartyDetails';
import { Box, Typography, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';
import { EditPartyInfo } from '../../Components/EditPartyInfo';
import { PartyMemberSideBar } from '../../Components/PartyMemberSideBar';
import { styled } from '@mui/system';
import { Card, Avatar } from '@mui/material';
import KeycloakService from "../../services/KeycloakService";
import axios from 'axios';
import { useParams } from 'react-router-dom';
const partyUrl = import.meta.env.VITE_API_PARTY_URL;
// const candidates = [
//   {
//     name: 'Mahinda Rajapaksa',
//     profilePicture: '/src/assets/mr.jpg',
//     description: 'Former President and Prime Minister of Sri Lanka, serving as a Member of Parliament for Kurunegala GeoData.'
//   },
//   {
//     name: 'Gotabaya Rajapaksa',
//     profilePicture: '/src/assets/gr.jpg',
//     description: 'Former President of Sri Lanka, previously served as the Minister of Defence and Urban Development.'
//   },
//   {
//     name: 'Basil Rajapaksa',
//     profilePicture: '/src/assets/br.jpg',
//     description: 'Founder and National Organizer of the SLPP, serving as a Member of Parliament for Gampaha GeoData.'
//   },
//   {
//     name: 'Namal Rajapaksa',
//     profilePicture: '/src/assets/nr.jpg',
//     description: 'Minister of Youth and Sports, serving as a Member of Parliament for Hambantota GeoData.'
//   },
//   {
//     name: 'Chamal Rajapaksa',
//     profilePicture: '/src/assets/cr.jpg',
//     description: 'Former Speaker of the Parliament of Sri Lanka, serving as a Member of Parliament for Hambantota GeoData.'
//   },
//   {
//     name: 'Dinesh Gunawardena',
//     profilePicture: '/src/assets/dr.jpg',
//     description: 'Current Prime Minister of Sri Lanka, serving as a Member of Parliament for Colombo GeoData.'
//   }
// ];

const CoverImage = styled('div')({
  height: 300,
  backgroundImage: 'url("../public/politician-bg.png")',
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

export const Party = () => {
  const [openEditPartyInfoModal, setOpenEditPartyInfoModal] = useState(false);
  const [party, setParty] = useState(null);
  const [error, setError] = useState(null);
  // const [candidates, setCandidates] = useState([]);
  const [partyLogo, setPartyLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [partyRequests, setPartyRequests] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [partyLogoName, setPartyLogoName] = useState(null);
  const { partyId } = useParams();

  const handleOpenEditPartyInfoModal = () => {
    setOpenEditPartyInfoModal(true);
  };

  const handleCloseEditPartyInfoModal = () => {
    setOpenEditPartyInfoModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = KeycloakService.getToken();
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
  
        // Fetch party data
        const partyResponse = await axios.get(`${partyUrl}/api/party/${partyId}`);
        const fetchedParty = partyResponse.data;
        setParty(fetchedParty);
  
        if (KeycloakService.isLoggedIn()) {
          const partyRequests = await axios.get(
            `${partyUrl}/api/request/party/${partyId}`,
            config
          );
          setPartyRequests(partyRequests.data);
          console.log("Party requests", partyRequests);
        }
  
        // Transform party members directly from fetchedParty
        if (fetchedParty.partyMembers && fetchedParty.partyMembers.length > 0) {
          const transformedCandidates = fetchedParty.partyMembers.map(member => ({
            name: member.partyMemberName,
            profilePicture: member.profilePicture || "../src/assets/default-profile.jpg",
            position: member.role || "Party Member",
            description: member.partyMemberDescription 
          }));
          setCandidates(transformedCandidates);
        }
  
        const logoDocument = fetchedParty.documents?.find(
          doc => doc.documentType === "logo"
        );
        if (logoDocument) {
          setPartyLogoName(logoDocument.documentName);
          await getPartyLogoUrl(logoDocument.documentName);
        }
  
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load party data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [partyId]);

  const getPartyLogoUrl = async (documentName) => {
    const partyLogoUrl = await axios.post(`${partyUrl}/api/document/url/${documentName}`);
    if (partyLogoUrl) {
      setPartyLogo(partyLogoUrl.data);
    }
  }

  if (isLoading) {
    return (
      <Box className="min-h-[600px] flex items-center justify-center bg-base-100 rounded-xl shadow-lg">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="min-h-[600px] flex items-center justify-center bg-base-100 rounded-xl shadow-lg p-6">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!party) {
    return (
      <Box className="min-h-[600px] flex items-center justify-center bg-base-100 rounded-xl shadow-lg p-6">
        <Typography>No party data available</Typography>
      </Box>
    );
  }

  return (
    <div className="min-h-[600px] flex flex-col bg-gray-100 shadow-2xl pb-4 rounded-lg">
      <CoverImage>
        <PartyLogo 
          src={partyLogo || "../src/assets/defaultPartyLogo.jpg"} 
          alt="Party Logo" 
          className='object-fill'
        />
      </CoverImage>
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <div className="text-4xl font-bold">{party.partyName} ({party.abbreviation})</div>
        <Typography variant="subtitle1" color="text.secondary">
          📍 {party.address?.city || 'N/A'} | 📞 {party.contactNumber || 'N/A'} | 📧 info@slpp.org | 🌐 {party.partyWebsite || 'N/A'}
        </Typography>
      </Box>
      <div className="mt-8 flex justify-center">
        <div className="bg-white rounded-lg py-8 px-4 w-[90%]">
          <div className="flex justify-around mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">17122</p>
              <p className="text-gray-600">No. of Individual MP Contributions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{party.totalSeats}</p>
              <p className="text-gray-600">No. of MPs in Parliament</p>
            </div>
          </div>
          <div className="py-4 mt-4 flex flex-row-reverse gap-32">
            <div className="partyDetailsContainer w-1/3">
              <Box className="flex justify-between">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Party Info
                </Typography>
                <Tooltip title="Update Party Info" arrow>
                  <IconButton size="large" onClick={handleOpenEditPartyInfoModal} color='primary'>
                    { party.secretaryId == KeycloakService.getNIC() && 
                      <EditNoteIcon />
                    }
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider />
              <Box my={2} />
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

            <div className="politicianContainer w-2/3">
              <Box className="flex justify-between">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Politicians
                </Typography>
                { ( party.secretaryId == KeycloakService.getNIC() || party.leaderId == KeycloakService.getNIC() ) && 
                  <PartyMemberSideBar party={party} partyRequests={partyRequests} partyLogo={partyLogoName}/>
                }
              </Box>
              <Divider />
              <Box my={2} />
              <div className="flex flex-col justify-between gap-2 w-full">
                {candidates.length > 0 ? (
                  candidates.map((candidate, index) => (
                    <Politician 
                      key={index} 
                      politician={{
                        name: candidate.name,
                        profilePicture: candidate.profilePicture,
                        position: candidate.position,
                        description: candidate.description
                      }} 
                      className="w-3/4"
                    />
                  ))
                ) : (
                  <div className="text-center w-full h-48 flex justify-center items-center">
                    <p className="text-gray-500">No politicians available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};