import React from 'react';
import {Politician} from '../Components/Politician';
import Divider from '@mui/material/Divider';

const candidates = [1,1,1,1,1,1,1,1,1,1,1,1];

export const Party = () => {
  return (
    <div className="min-h-[600px] flex flex-col bg-gray-100 shadow-2xl pb-4 ">
      {/* Cover Image */}
      <div className="relative">
        <img
          src="src\assets\politician-bg.png" // Replace with the actual cover image URL
          alt="Cover"
          className="w-full h-64 object-cover"
        />
        {/* Party Symbol */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-white border-4 border-gray-300 rounded-full overflow-hidden">
          <img
            src="src\assets\slpp.jpg" // Replace with the actual party symbol URL
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
        <div className="bg-white rounded-lg shadow-lg p-8 w-4/5">
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
          <div className='flex justify-between gap-6 p-4 mt-4'>
            <div className=''>
              {/* Top 5 MPs Section */}
              <h6 className="text-xl font-bold mb-4">Politicians</h6>
              {/* List of Politicians */}
              <div>
                {
                  candidates.map((candidate) => <Politician />)
                }
              </div>
            </div>
            {/* Sidebar for summary, top MPs, politicians, and compare politicians */}
            <div className="w-60 bg-white border-2 border-pink-500 rounded-lg  p-4">
              <div className="mb-4">
                <h4 className="text-l font-bold">Summary</h4>
                <p className="text-gray-600">Summary details here...</p>
              </div>
              <div className="mb-4">
                <h3 className="text-l font-bold">Top 5 MPs</h3>
                <p className="text-gray-600">Top MPs details here...</p>
              </div>
              <div className="mb-4">
                <h3 className="text-l font-bold">Politicians</h3>
                <p className="text-gray-600">Politician details here...</p>
              </div>
              <div className="mb-4">
                <h3 className="text-l font-bold">Compare Politicians</h3>
                <p className="text-gray-600">How have your favourite politicians performed?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

