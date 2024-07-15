import React from 'react';
import {Politician} from '../../Components/PoliticianCard';
import Divider from '@mui/material/Divider';
import { PartyDetails } from '../../Components/PartyDetails';

const candidates = [1,1,1,1,1,1,1,1,1,1,1,1];

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

export const Party = () => {
  return (
    <div className="min-h-[600px] flex flex-col bg-gray-100 shadow-2xl pb-4 rounded-lg">
      {/* Cover Image */}
      <div className="relative">
        <img
          src="..\src\assets\politician-bg.png" // Replace with the actual cover image URL
          alt="Cover"
          className="w-full h-64 object-cover"
        />
        {/* Party Symbol */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-white border-4 border-gray-300 rounded-full overflow-hidden">
          <img
            src="..\src\assets\slpp.jpg" // Replace with the actual party symbol URL
            alt="Party Symbol"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Party Info */}
      <div className="mt-16 text-center">
        <h1 className="text-4xl font-bold">Sri Lanka Podujana Peramuna (SLPP)</h1>
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
          <div className='flex flex-row-reverse gap-6 py-4 mt-4'>
            <div className='partyDetailsContainer w-2/5'>
              <h6 className="text-xl font-bold mb-4">Party Info</h6>
              <div className='partyInfo'>
                <PartyDetails party={party}/>
              </div>
            </div>
            <Divider orientation="vertical" flexItem/>
            {/* Politician Section */}
            <div className='politicianContainer'>
              <h6 className="text-xl font-bold mb-4">Politicians</h6>
              {/* List of Politicians */}
              <div className='flex flex-col gap-2'>
                {
                  candidates.map((candidate) => <Politician />)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
