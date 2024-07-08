import React from 'react';
import PartyCard from '../../Components/PartyCard';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


// Importing images
import unpImage from '../../assets/unp.png';
import slppImage from '../../assets/slpp.jpg';

const parties = [
  {
    id: "1",
    name: "United National Party (UNP)",
    leader: "Mr. Ranil Wickremesinghe",
    secretary: "Mr. Akila Viraj Kariyawasam",
    image: unpImage,  // Updated to use the imported image
    noOfMPs: 2
  },
  {
    id: "2",
    name: "Sri Lanka Podujana Peramuna (SLPP)",
    leader: "Mr. Mahinda Rajapaksha",
    secretary: "Mr. Sagara Kariyawasam",
    image: slppImage,  // Updated to use the imported image
    noOfMPs: 152
  }
];

export const PartyList = () => {
  const navigate = useNavigate();

  const openPartyRegistration = () => {
    navigate('/party/registration');
  };

  return (
    <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
      <div className='partyListcontainer'>
        {/* Header */}
        <div className='header mt-8 mb-4 flex justify-between items-center'>
          {/* Topic */}
          <div className="topic text-3xl">
              Recognized Parties
          </div>
          {/* Publish new announcement */}
          <div className=''>
              <Button variant="contained" onClick={openPartyRegistration} className='bg-pink-500'>Register New Party</Button>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='leftContainer w-[70%]'>
            <div className="flex flex-col">
              {parties.map((party, index) => (
                <PartyCard key={index} party={party} />
              ))}
            </div>
          </div>
          <div className='rightContainer w=[30%]'>

          </div>
        </div>
      </div>
    </div>
  );
};

