import React from 'react';
import Divider from '@mui/material/Divider';
import { PartyDetails } from '../../Components/PartyDetails';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, Typography, LinearProgress, Avatar } from '@mui/material';
import { PopUpChat } from '../../Components/PopUpChat';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PartyMemberTermsInParliment } from '../../Components/PartyMemberTermsInParliment';
import { PartyMemberBiography } from '../../Components/PartyMemberBiography';
import { PartyMemberContactInfo } from '../../Components/PartyMemberContactInfo';
import { PartyMemberParticipatedTopics } from '../../Components/PartyMemberParticipatedTopics';
import { PartyMemberActivities } from '../../Components/PartyMemberActivities';
import { PartyMemberManifestos } from '../../Components/PartyMemberManifestos';

const candidates = [1,1,1,1,1,1,1,1,1,1,1,1];

const partyMember = {
    name: "Percy Mahinda Rajapaksa",
    position: "Prime Minister - Finance, Economic and Policy Planning",
    profilePicture: "../assets/mr.jpg",
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
      born: "Weeraketiya",
      gender: "Male",
      schoolEducation: [
        { school: "Richmond College, Galle" },
        { school: "Nalanda College, Colombo" },
        // Add more education details as needed
      ],
      undergraduateEducation: [
        { university: " Sri Lanka Law College" }
        // Add more education details as needed
      ],
      postgraduateEducation: [
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
    termId: 1,
    dateRange: '2020-08-20 to present',
    startDate: '2020-08-20',
    endDate: 'present',
    party: 'Sri Lanka Podujana Peramuna (SLPP)',
    logo: 'path-to-slpp-logo.png',
    progress: 100,
  },
  {
    termId: 2,
    dateRange: '2015-09-01 - 2020-03-02',
    startDate: '2015-09-01',
    endDate: '2020-03-02',
    party: 'United People\'s Freedom Alliance (UPFA)',
    logo: 'path-to-upfa-logo.png',
    progress: 80,
  },
  {
    termId: 3,
    dateRange: '2004-04-22 - 2005-11-19',
    startDate: '2004-04-22',
    endDate: '2005-11-19',
    party: 'United People\'s Freedom Alliance (UPFA)',
    logo: 'path-to-upfa-logo.png',
    progress: 60,
  },
  {
    termId: 4,
    dateRange: '2001-12-19 - 2004-02-07',
    startDate: '2001-12-19',
    endDate: '2004-02-07',
    party: 'People\'s Alliance (PA)',
    logo: 'path-to-pa-logo.png',
    progress: 40,
  },
  {
    termId: 5,
    dateRange: '2000-10-18 - 2001-10-10',
    startDate: '2000-10-18',
    endDate: '2001-10-10',
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

const manifestos = [
  {
    id: 1, // Updated to 'id' as per DataGrid row requirements
    manifestoName: "100 days and beyond",
    createdDate: "28.07.2024",
    progress: 20 // Changed to number
  },
  {
    id: 2, // Updated to 'id' as per DataGrid row requirements
    manifestoName: "test manifesto",
    createdDate: "15.06.2024",
    progress: 0 // Changed to number and provided a default value
  },
  {
    id: 2, // Updated to 'id' as per DataGrid row requirements
    manifestoName: "test manifesto",
    createdDate: "15.06.2024",
    progress: 0 // Changed to number and provided a default value
  },
  {
    id: 2, // Updated to 'id' as per DataGrid row requirements
    manifestoName: "test manifesto",
    createdDate: "15.06.2024",
    progress: 0 // Changed to number and provided a default value
  },
  {
    id: 2, // Updated to 'id' as per DataGrid row requirements
    manifestoName: "test manifesto",
    createdDate: "15.06.2024",
    progress: 0 // Changed to number and provided a default value
  },
  {
    id: 2, // Updated to 'id' as per DataGrid row requirements
    manifestoName: "test manifesto",
    createdDate: "15.06.2024",
    progress: 0 // Changed to number and provided a default value
  }
];

const activities = [
  {
    hansardCode: '311-6',
    date: '2024-02-22',
    method: 'Oral Contribution',
    topic: 'Governance, Administration and Parliamentary Affairs',
    page: '24'
  },
  {
    hansardCode: '307-8',
    date: '2023-11-21',
    method: 'Bill / Regulation / Order /Resolution - Debate Oral Contribution',
    topic: 'Economy and Finance',
    page: '44'
  },
  {
    hansardCode: '304-13',
    date: '2023-07-18',
    method: 'Adjournment Motion Type 2',
    topic: 'Governance, Administration and Parliamentary Affairs',
    page: '68'
  },
  {
    hansardCode: '303-8',
    date: '2023-05-26',
    method: 'Oral Contribution - Core Statements',
    topic: 'Governance, Administration and Parliamentary Affairs',
    page: '20'
  },
  {
    hansardCode: '297-08',
    date: '2022-11-22',
    method: 'Bill / Regulation / Order /Resolution - Debate Oral Contribution',
    topic: 'Economy and Finance',
    page: '14'
  },
  {
    hansardCode: '296-17',
    date: '2022-11-11',
    method: 'Oral Contribution - Core Statements',
    topic: 'Governance, Administration and Parliamentary Affairs',
    page: '29'
  },
  {
    hansardCode: '296-04',
    date: '2022-09-23',
    method: 'Oral Contribution - Core Statements',
    topic: 'Governance, Administration and Parliamentary Affairs',
    page: '14'
  }
];

const topics = [
  { number: 75, topic: 'Governance, Administration and Parliamentary Affairs', color: 'primary' },
  { number: 83, topic: 'Trade & Industry', color: 'secondary' },
  { number: 84, topic: 'Economy and Finance', color: 'error' },
  { number: 89, topic: 'Labour & Employment', color: 'warning' },
  { number: 124, topic: 'National Heritage, Media & Sports', color: 'info' },
  { number: 130, topic: 'Urban Planning, Infrastructure and Transportation', color: 'error' },
  { number: 143, topic: 'Justice, Defence & Public Order', color: 'warning' },
  { number: 173, topic: 'Agriculture, Plantations, Livestock & Fisheries', color: 'info' },
  { number: 173, topic: 'Health', color: 'error' }
];

const topicsAddressed = [
  { topicId: 1, topicName: "Governance, Administration and Parliamentary Affairs", userId: 101 },
  { topicId: 2, topicName: "Trade & Industry", userId: 102 },
  { topicId: 3, topicName: "Economy and Finance", userId: 103 },
  { topicId: 4, topicName: "Labour & Employment", userId: 104 },
  { topicId: 5, topicName: "National Heritage, Media & Sports", userId: 105 },
  { topicId: 6, topicName: "Urban Planning, Infrastructure and Transportation", userId: 106 },
  { topicId: 7, topicName: "Justice, Defence & Public Order", userId: 107 },
  { topicId: 8, topicName: "Agriculture, Plantations, Livestock & Fisheries", userId: 108 },
  { topicId: 9, topicName: "Health", userId: 109 },
  { topicId: 10, topicName: "Natural Resources & Environment", userId: 110 },
  { topicId: 11, topicName: "Rights & Representation", userId: 111 }
];



export const PartyMember = () => {

  return (
    <div className="min-h-[600px] flex flex-col bg-gray-100 shadow-2xl pb-4 rounded-lg">
      
      {/* Politician Header */}
      <div className="relative">
        {/* Cover Image */}
        <img
          src="\assets\politician-bg.png"
          alt="Cover"
          className="w-full h-64 object-cover"
        />
        {/* Politician Profile Pictue, Name and Contact Details */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-white w-full max-w-4xl px-4">
          <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 md:gap-6">
            {/* Politician Profile Picture */}
            <div className="profilePicture relative w-32 h-32 bg-white border-4 border-gray-300 rounded-full">
              <img
                src={partyMember.profilePicture}
                alt="Party Symbol"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-2xl md:text-4xl font-bold">{partyMember.name}</h1>
              <p className="mt-2 flex flex-col md:flex-row justify-center md:justify-start gap-2 md:gap-4">
                <span className="mr-0 md:mr-4">📞 {partyMember.contact.phone}</span>
                <span>📧 {partyMember.contact.email}</span>
                <span className="ml-0 md:ml-4">🌐 slpp.org</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Party Member Info */}
      <div className="mt-8 flex justify-center">
        <div className="bg-white rounded-lg py-8 px-4 w-[90%]">

          {/* Biography */}
          <PartyMemberBiography partyMember={partyMember}/>

          {/* Terms in Parliment */}
          <PartyMemberTermsInParliment terms={terms}/>

          {/* Contact*/}
          <PartyMemberContactInfo contactDetails={contactDetails}/>

          {/* Manifestos */}
          <PartyMemberManifestos manifestos={manifestos}/>

          {/* Topics Participated */}
          <PartyMemberParticipatedTopics topicsAddressed={topicsAddressed}/>

          {/* Activities in Parliment */}
          <PartyMemberActivities activities={activities}/>

        </div>
      </div>
    </div>
  );
}

