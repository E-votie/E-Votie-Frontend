import React from 'react';
import Divider from '@mui/material/Divider';
import { PartyDetails } from '../../Components/PartyDetails';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, Typography, LinearProgress, Avatar } from '@mui/material';
import { PopUpChat } from '../../Components/PopUpChat';


const candidates = [1,1,1,1,1,1,1,1,1,1,1,1];

const partyMember = {
    name: "Mahinda Rajapaksa",
    position: "Prime Minister - Finance, Economic and Policy Planning",
    profilePicture: "../src/assets/mr.jpg",
    summary: {
      overallRank: 146,
      partyRank: 39,
      timesParticipated: 70,
      topics: 10,
    },
    topicsParticipation: [
      { topic: "Economy and Finance", rank: 61 },
      { topic: "Justice, Defence & Public Order", rank: 81 },
      // Add more topics as needed
    ],
    activities: [
      { date: "2020-01-09", method: "Oral Contribution", topic: "Governance, Administration and Parliamentary Affairs", page: 7 },
      // Add more activities as needed
    ],
    biography: {
      dob: "1945-11-18",
      gender: "Male",
      education: [
        { school: "Richmond College, Galle" },
        { school: "Nalanda College, Colombo" },
        // Add more education details as needed
      ],
      // Add more biography details as needed
    },
    contact: {
      address: "Residence: No. 1316, Jayanthipura, Nelum Mawatha, Battaramulla",
      email: "mahinda@example.com",
      phone: "0112692395",
    },
  };

const terms = [
  {
    dateRange: '2020-08-20 to present',
    party: 'Sri Lanka Podujana Peramuna (SLPP)',
    logo: 'path-to-slpp-logo.png',
    progress: 100,
  },
  {
    dateRange: '2015-09-01 - 2020-03-02',
    party: 'United People\'s Freedom Alliance (UPFA)',
    logo: 'path-to-upfa-logo.png',
    progress: 80,
  },
  {
    dateRange: '2004-04-22 - 2005-11-19',
    party: 'United People\'s Freedom Alliance (UPFA)',
    logo: 'path-to-upfa-logo.png',
    progress: 60,
  },
  {
    dateRange: '2001-12-19 - 2004-02-07',
    party: 'People\'s Alliance (PA)',
    logo: 'path-to-pa-logo.png',
    progress: 40,
  },
  {
    dateRange: '2000-10-18 - 2001-10-10',
    party: 'People\'s Alliance (PA)',
    logo: 'path-to-pa-logo.png',
    progress: 20,
  },
];


const contactDetails = {
  address: {
    residence: "No. 117, Wijerama Road, Colombo 07.",
    office: "No. 117, Wijerama Mawatha, Colombo 07."
  },
  email: {
    personal: "rajapaksa_m@parliament.lk",
    office: ""
  },
  mobile: {
    residence: "011 4354754 / 011 2333066",
    office: ""
  },
  secretary: {
    name: "Mr. A.M. Rathnayake/Mr. Upul Dissanayake",
    email: "am.rathnayake5@gmail.com,upuldissanayakasr@gmail.com",
    mobile: "071 4397076",
    telephone: "011 2303279 / 011 2860770"
  }
};

const messages = [
  {
    sentByUser: false,
    avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    alt: "User avatar",
    name: "Obi-Wan Kenobi",
    time: "12:45",
    text: "You were the Chosen One!",
    status: "Delivered"
  },
  {
    sentByUser: true,
    avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    alt: "User avatar",
    name: "Anakin",
    time: "12:46",
    text: "I hate you!",
    status: "Seen at 12:46"
  }
];

const party = {
  "partyName": "Sri Lanka Podujana Peramuna",
  "abbreviation": "SLPP",
  "logo": "https://pbs.twimg.com/profile_images/1042605472249864192/P8mqmZXX_400x400.jpg",
  "leader": "Mahinda Rajapaksa",
  "secretary": "Sagara Kariyawasam",
  "foundedYear": 2016,
  "headquarters": {
      "address": "No. 1316, Podujana Peramuna, Jayanthipura, Nelum Mawatha, Battaramulla 10120, Sri Lanka",
      "contactNumber": "+94112866010"
  },
  "colors": ["Red", "Blue", "Green"],
  "seatsInParliament": {
      "districtBasisSeats": 128,
      "nationalBasisSeats": 17,
      "totalSeats": 145
  },
  "website": "http://www.slpp.lk"
};


export const PartyMember = () => {
  return (
    <div className="min-h-[600px] flex flex-col bg-gray-100 shadow-2xl pb-4 rounded-lg">
      {/* Cover Image */}
      <div className="relative">
        <img
          src="..\src\assets\politician-bg.png" 
          alt="Cover"
          className="w-full h-64 object-cover"
        />
        {/* <EditIcon /> */}
        {/* Politician Header */}
        <div className="absolute top-16 right-1/2 overflow-hidden text-white">
          <div className='relative flex items-center justify-normal gap-6'>
            {/* Politician Profile Picture */}
            <div className="profilePicture relative w-32 h-32 bg-white border-4 border-gray-300 rounded-full ">
              <img
                src={partyMember.profilePicture} 
                alt="Party Symbol"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-2 right-2 transform translate-x-2 translate-y-2 p-1 bg-gray-800 rounded-full z-10">
                <EditIcon className="text-white cursor-pointer" />
              </div>          
            </div>
            <div className=" text-white">
              <h1 className="text-4xl font-bold">{partyMember.name}</h1>
              <p className="mt-2 ">
                <span className="mr-4">📞 {partyMember.contact.phone}</span>
                <span>📧 {partyMember.contact.email}</span>
                <span className="ml-4">🌐 slpp.org</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Party Member Info */}
      <div className="mt-8 flex justify-center">
        <div className="bg-white rounded-lg py-8 px-4 w-[90%]">

          {/* Biography */}
          <div className="pb-2 mb-8">
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Biography
            </Typography>   
            <Divider />

            <div className="p-4">

              <div className="mt-4 w-1/2">
                <h2 className="text-gray-600 font-semibold">Personal</h2>
                <div className="bg-gray-100 p-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Date Of Birth:</span>
                    <span>1945-11-18</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">Gender:</span>
                    <span>Male</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 w-1/2">
                <h2 className="text-gray-600 font-semibold">Education</h2>
                <div className="bg-gray-100 p-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">School:</span>
                    <span>Richmond College, Galle, Nalanda College, Colombo</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">School 2:</span>
                    <span>Thurstan College, Colombo</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">Undergraduate:</span>
                    <span>Sri Lanka Law College, Colombo</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">Postgraduate:</span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms in Parliment */}
          <div className="pb-2 mb-8">
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Terms in parliament
            </Typography>            
            <Divider />

            <Box p={2}>
              {terms.map((term, index) => (
                <Grid container alignItems="center" spacing={2} key={index} my={1}>
                  <Grid item xs={3}>
                    <Typography>{term.dateRange}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <LinearProgress
                      variant="determinate"
                      value={term.progress}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Avatar src={term.logo} alt="Party Logo" />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>{term.party}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </div>

          {/* Contact*/}
          <div className="pb-2 mb-8">
            <h6 className="text-xl font-bold mb-4">Contact</h6>
            <Divider />

            <Box p={2}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Contact
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
                    Address
                  </Typography>
                  <Box sx={{ p: 1 }}>
                    <Typography>Residence: {contactDetails.address.residence}</Typography>
                    <Typography>Office: {contactDetails.address.office}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
                    Email
                  </Typography>
                  <Box sx={{ p: 1 }}>
                    <Typography>Personal: {contactDetails.email.personal}</Typography>
                    <Typography>Office: {contactDetails.email.office}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
                    Mobile
                  </Typography>
                  <Box sx={{ p: 1 }}>
                    <Typography>Residence: {contactDetails.mobile.residence}</Typography>
                    <Typography>Office: {contactDetails.mobile.office}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ backgroundColor: '#e0e0e0', p: 1, fontWeight: 'bold' }}>
                    Contact Details of the Secretary
                  </Typography>
                  <Box sx={{ p: 1 }}>
                    <Typography>Name: {contactDetails.secretary.name}</Typography>
                    <Typography>Email: {contactDetails.secretary.email}</Typography>
                    <Typography>Mobile: {contactDetails.secretary.mobile}</Typography>
                    <Typography>Telephone: {contactDetails.secretary.telephone}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </div>

          {/* Topics Participated */}
          <div className='pb-2 mb-8'>
            <h6 className="text-xl font-bold mb-4">Topics Participated</h6>
            <Divider />
          </div>
          {/* Activities in Parliment */}
          <div>
            <h6 className="text-xl font-bold mb-4">Activities in Parliment</h6>
            <Divider />

          </div>

        </div>
      </div>
      <PopUpChat messages={messages}/>
    </div>
  );
}

