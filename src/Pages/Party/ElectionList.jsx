// import React from 'react'
// import Button from '@mui/material/Button';
// import {Elections} from '../../Components/Elections';
// import CreateIcon from '@mui/icons-material/Create';

// const pastElections = [
//   {"id": 1, "type": "General Election - 1st State Council", "startDate": "13.06.1931", "endDate": "20.06.1931", "duration": "7 days"},
//   {"id": 2, "type": "General Election - 2nd State Council", "startDate": "22.02.1936", "endDate": "07.03.1936", "duration": "11 days"},
//   {"id": 3, "type": "General Election - House of Representatives (1st Parliament)", "startDate": "23.08.1947", "endDate": "20.09.1947", "duration": "19 days"},
//   {"id": 4, "type": "General Election - House of Representatives (2nd Parliament)", "startDate": "24.05.1952", "endDate": "30.05.1952", "duration": "4 days"},
//   {"id": 5, "type": "General Election - House of Representatives (3rd Parliament)", "startDate": "05.04.1956", "endDate": "10.04.1956", "duration": "3 days"},
//   {"id": 6, "type": "General Election - House of Representatives (4th Parliament)", "startDate": "19.03.1960", "endDate": "", "duration": ""},
//   {"id": 7, "type": "General Election - House of Representatives (5th Parliament)", "startDate": "20.07.1960", "endDate": "", "duration": ""},
//   {"id": 8, "type": "General Election - House of Representatives (6th Parliament)", "startDate": "22.03.1965", "endDate": "", "duration": ""},
//   {"id": 9, "type": "General Election - House of Representatives (7th Parliament)", "startDate": "27.05.1970", "endDate": "", "duration": ""},
//   {"id": 10, "type": "General Election - 2nd National State Assembly (8th Parliament)", "startDate": "21.07.1977", "endDate": "", "duration": ""},
//   {"id": 11, "type": "Presidential Election (1st)", "startDate": "20.10.1982", "endDate": "", "duration": ""},
//   {"id": 12, "type": "Referendum", "startDate": "22.12.1982", "endDate": "", "duration": ""},
//   {"id": 13, "type": "Provincial Councils Election", "startDate": "28.04.1988", "endDate": "", "duration": ""},
//   {"id": 14, "type": "Presidential Election (2nd)", "startDate": "19.12.1988", "endDate": "", "duration": ""},
//   {"id": 15, "type": "General Election - 2nd Parliament of the D.S.R. of Sri Lanka (9th Parliament)", "startDate": "15.02.1989", "endDate": "", "duration": ""},
//   {"id": 16, "type": "Local Government Election", "startDate": "11.05.1991", "endDate": "", "duration": ""},
//   {"id": 17, "type": "Provincial Councils Election", "startDate": "17.05.1993", "endDate": "", "duration": ""},
//   {"id": 18, "type": "Local Government Election - Eastern Province", "startDate": "01.03.1994", "endDate": "", "duration": ""},
//   {"id": 19, "type": "General Election - 3rd Parliament of the D.S.R. of Sri Lanka (10th Parliament)", "startDate": "16.08.1994", "endDate": "", "duration": ""},
//   {"id": 20, "type": "Presidential Election (3rd)", "startDate": "09.11.1994", "endDate": "", "duration": ""},
//   {"id": 21, "type": "Local Government Election", "startDate": "21.03.1997", "endDate": "", "duration": ""},
//   {"id": 22, "type": "Provincial Councils Election", "startDate": "25.01.1999", "endDate": "", "duration": ""},
//   {"id": 23, "type": "Presidential Election (4th)", "startDate": "21.12.1999", "endDate": "", "duration": ""},
//   {"id": 24, "type": "General Election - 4th Parliament of the D.S.R of Sri Lanka (11th Parliament)", "startDate": "10.10.2000", "endDate": "", "duration": ""},
//   {"id": 25, "type": "General Election - 5th Parliament of the D.S.R. of Sri Lanka (12th Parliament)", "startDate": "05.12.2001", "endDate": "", "duration": ""},
//   {"id": 26, "type": "Local Government Election", "startDate": "20.03.2002", "endDate": "20.05.2002", "duration": ""},
//   {"id": 27, "type": "General Election - 6th Parliament of the D.S.R. of Sri Lanka (13th Parliament)", "startDate": "02.04.2004", "endDate": "", "duration": ""},
//   {"id": 28, "type": "Provincial Councils Election", "startDate": "25.04.2004", "endDate": "", "duration": ""},
//   {"id": 29, "type": "Presidential Election (5th)", "startDate": "17.11.2005", "endDate": "", "duration": ""},
//   {"id": 30, "type": "Local Government Election", "startDate": "30.03.2006", "endDate": "20.05.2006", "duration": ""},
//   {"id": 31, "type": "Provincial Councils Election", "startDate": "10.05.2008", "endDate": "", "duration": ""},
//   {"id": 32, "type": "Local Government Election", "startDate": "08.08.2009", "endDate": "", "duration": ""},
//   {"id": 33, "type": "Provincial Councils Election", "startDate": "10.10.2009", "endDate": "", "duration": ""},
//   {"id": 34, "type": "Presidential Election (6th)", "startDate": "26.01.2010", "endDate": "", "duration": ""},
//   {"id": 35, "type": "General Election - 7th Parliament of the D.S.R. of Sri Lanka (14th Parliament)", "startDate": "08.04.2010", "endDate": "20.04.2010", "duration": ""},
//   {"id": 36, "type": "Local Government Election", "startDate": "17.03.2011", "endDate": "", "duration": ""},
//   {"id": 37, "type": "Provincial Councils Election", "startDate": "08.09.2012", "endDate": "", "duration": ""},
//   {"id": 38, "type": "Presidential Election (7th)", "startDate": "08.01.2015", "endDate": "", "duration": ""},
//   {"id": 39, "type": "General Election - 8th Parliament of the D.S.R. of Sri Lanka (15th Parliament)", "startDate": "17.08.2015", "endDate": "", "duration": ""},
//   {"id": 40, "type": "Local Government Election", "startDate": "10.02.2018", "endDate": "", "duration": ""},
//   {"id": 41, "type": "Presidential Election (8th)", "startDate": "16.11.2019", "endDate": "", "duration": ""},
//   {"id": 42, "type": "General Election - 9th Parliament of the D.S.R. of Sri Lanka (16th Parliament)", "startDate": "05.08.2020", "endDate": "", "duration": ""}
// ]

// const currentElections = [];

// export const ElectionList = () => {
//   return (
//     <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
//       {/* Header */}
//       <div className='header my-8 flex justify-between items-center'>
//         {/* Topic */}
//         <div className="topic text-3xl">
//             Elections
//         </div>
//         {/* Publish new announcement */}
//         <div className=''>
//             <Button
//                 variant="contained"
//                 startIcon={<CreateIcon />}
//                 sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
//                 >
//                 Create New Election
//             </Button>  
//         </div>
//       </div>
//       <div className='electionContainer'>
//         {/* Current Elections */}
//         <div className='electionList'>
//           <Elections topic="Upcoming Elections" electionData={currentElections}/>
//         </div>
//         {/* Upcoming Elections */}
//         <div className='electionList'>
//           <Elections topic="Past Elections" electionData={pastElections}/>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from 'react';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { Elections } from '../../Components/Elections';


const pastElections = [
  {"id": 1, "type": "General Election - 1st State Council", "startDate": "13.06.1931", "endDate": "20.06.1931", "duration": "7 days"},
  {"id": 2, "type": "General Election - 2nd State Council", "startDate": "22.02.1936", "endDate": "07.03.1936", "duration": "11 days"},
  {"id": 3, "type": "General Election - House of Representatives (1st Parliament)", "startDate": "23.08.1947", "endDate": "20.09.1947", "duration": "19 days"},
  {"id": 4, "type": "General Election - House of Representatives (2nd Parliament)", "startDate": "24.05.1952", "endDate": "30.05.1952", "duration": "4 days"},
  {"id": 5, "type": "General Election - House of Representatives (3rd Parliament)", "startDate": "05.04.1956", "endDate": "10.04.1956", "duration": "3 days"},
  {"id": 6, "type": "General Election - House of Representatives (4th Parliament)", "startDate": "19.03.1960", "endDate": "", "duration": ""},
  {"id": 7, "type": "General Election - House of Representatives (5th Parliament)", "startDate": "20.07.1960", "endDate": "", "duration": ""},
  {"id": 8, "type": "General Election - House of Representatives (6th Parliament)", "startDate": "22.03.1965", "endDate": "", "duration": ""},
  {"id": 9, "type": "General Election - House of Representatives (7th Parliament)", "startDate": "27.05.1970", "endDate": "", "duration": ""},
  {"id": 10, "type": "General Election - 2nd National State Assembly (8th Parliament)", "startDate": "21.07.1977", "endDate": "", "duration": ""},
  {"id": 11, "type": "Presidential Election (1st)", "startDate": "20.10.1982", "endDate": "", "duration": ""},
  {"id": 12, "type": "Referendum", "startDate": "22.12.1982", "endDate": "", "duration": ""},
  {"id": 13, "type": "Provincial Councils Election", "startDate": "28.04.1988", "endDate": "", "duration": ""},
  {"id": 14, "type": "Presidential Election (2nd)", "startDate": "19.12.1988", "endDate": "", "duration": ""},
  {"id": 15, "type": "General Election - 2nd Parliament of the D.S.R. of Sri Lanka (9th Parliament)", "startDate": "15.02.1989", "endDate": "", "duration": ""},
  {"id": 16, "type": "Local Government Election", "startDate": "11.05.1991", "endDate": "", "duration": ""},
  {"id": 17, "type": "Provincial Councils Election", "startDate": "17.05.1993", "endDate": "", "duration": ""},
  {"id": 18, "type": "Local Government Election - Eastern Province", "startDate": "01.03.1994", "endDate": "", "duration": ""},
  {"id": 19, "type": "General Election - 3rd Parliament of the D.S.R. of Sri Lanka (10th Parliament)", "startDate": "16.08.1994", "endDate": "", "duration": ""},
  {"id": 20, "type": "Presidential Election (3rd)", "startDate": "09.11.1994", "endDate": "", "duration": ""},
  {"id": 21, "type": "Local Government Election", "startDate": "21.03.1997", "endDate": "", "duration": ""},
  {"id": 22, "type": "Provincial Councils Election", "startDate": "25.01.1999", "endDate": "", "duration": ""},
  {"id": 23, "type": "Presidential Election (4th)", "startDate": "21.12.1999", "endDate": "", "duration": ""},
  {"id": 24, "type": "General Election - 4th Parliament of the D.S.R of Sri Lanka (11th Parliament)", "startDate": "10.10.2000", "endDate": "", "duration": ""},
  {"id": 25, "type": "General Election - 5th Parliament of the D.S.R. of Sri Lanka (12th Parliament)", "startDate": "05.12.2001", "endDate": "", "duration": ""},
  {"id": 26, "type": "Local Government Election", "startDate": "20.03.2002", "endDate": "20.05.2002", "duration": ""},
  {"id": 27, "type": "General Election - 6th Parliament of the D.S.R. of Sri Lanka (13th Parliament)", "startDate": "02.04.2004", "endDate": "", "duration": ""},
  {"id": 28, "type": "Provincial Councils Election", "startDate": "25.04.2004", "endDate": "", "duration": ""},
  {"id": 29, "type": "Presidential Election (5th)", "startDate": "17.11.2005", "endDate": "", "duration": ""},
  {"id": 30, "type": "Local Government Election", "startDate": "30.03.2006", "endDate": "20.05.2006", "duration": ""},
  {"id": 31, "type": "Provincial Councils Election", "startDate": "10.05.2008", "endDate": "", "duration": ""},
  {"id": 32, "type": "Local Government Election", "startDate": "08.08.2009", "endDate": "", "duration": ""},
  {"id": 33, "type": "Provincial Councils Election", "startDate": "10.10.2009", "endDate": "", "duration": ""},
  {"id": 34, "type": "Presidential Election (6th)", "startDate": "26.01.2010", "endDate": "", "duration": ""},
  {"id": 35, "type": "General Election - 7th Parliament of the D.S.R. of Sri Lanka (14th Parliament)", "startDate": "08.04.2010", "endDate": "20.04.2010", "duration": ""},
  {"id": 36, "type": "Local Government Election", "startDate": "17.03.2011", "endDate": "", "duration": ""},
  {"id": 37, "type": "Provincial Councils Election", "startDate": "08.09.2012", "endDate": "", "duration": ""},
  {"id": 38, "type": "Presidential Election (7th)", "startDate": "08.01.2015", "endDate": "", "duration": ""},
  {"id": 39, "type": "General Election - 8th Parliament of the D.S.R. of Sri Lanka (15th Parliament)", "startDate": "17.08.2015", "endDate": "", "duration": ""},
  {"id": 40, "type": "Local Government Election", "startDate": "10.02.2018", "endDate": "", "duration": ""},
  {"id": 41, "type": "Presidential Election (8th)", "startDate": "16.11.2019", "endDate": "", "duration": ""},
  {"id": 42, "type": "General Election - 9th Parliament of the D.S.R. of Sri Lanka (16th Parliament)", "startDate": "05.08.2020", "endDate": "", "duration": ""}
]

const currentElections = [];


export const ElectionList = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 shadow-md rounded-xl p-6 gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Topic */}
        <div className="text-3xl font-semibold text-gray-900">
          Elections
        </div>
        {/* Publish new announcement */}
        <Button
          variant="contained"
          startIcon={<CreateIcon />}
          sx={{
            backgroundColor: 'rgb(236 72 153)', // Original pink color
            color: '#fff',
            '&:hover': { 
                backgroundColor: 'rgb(220 57 138)' // Slightly darker pink color for hover
            }
          }}
          // sx={{
          //   backgroundColor: '#1976d2',
          //   color: '#fff',
          //   '&:hover': { backgroundColor: '#115293' }
          // }}
        >
          Create New Election
        </Button>
      </div>
      
      <div className="flex lg:flex-col md:flex-row gap-6">
          {/* Current Elections */}
          <div className="flex-1">
            <Elections topic="Upcoming Elections" electionData={currentElections} />
          </div>
        
          {/* Past Elections */}
          <div className="flex-1">
            <Elections topic="Past Elections" electionData={pastElections} />
          </div>
      </div>
    </div>
  );
};
