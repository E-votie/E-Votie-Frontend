import React from 'react'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export const ElectionList = () => {
  return (
    <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
      {/* Header */}
      <div className='header my-8 flex justify-between items-center'>
        {/* Topic */}
        <div className="topic text-3xl">
            Elections
        </div>
        {/* Publish new announcement */}
        <div className=''>
            <Button variant="outlined" className='bg-pink-500'>Create New Election</Button>
        </div>
      </div>
      <div className='electionContainer'>
        <div className='upcomingElections'>
          <div className="topic text-xl mb-4 font-bold ">
              Upcoming Elections
          </div> 
        </div>
        <div className='pastElections'>
          <div className="topic text-xl mb-4 font-bold ">
              Past Elections
          </div> 
        </div>
      </div>
    </div>
  )
}
