import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import {Elections} from '../../Components/Elections';
import CreateIcon from '@mui/icons-material/Create';
import {useNavigate} from "react-router-dom";
import {authGet} from "../../Auth/authFetch.jsx";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CircularProgress from "@mui/material/CircularProgress";

const currentElections = [];

export const ElectionList = () => {

  const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('ongoing'); // 'ongoing', 'upcoming', 'past'
    const [ongoingElections, setOngoingElections] = useState([]);
    const [upcomingElections, setUpcomingElections] = useState([]);
    const [pastElections, setPastElections] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch elections based on selected tab
        setLoading(true);
        authGet(`/election/get_elections/${selectedTab}`)
            .then((response) => {
                if (selectedTab === 'ongoing') {
                    setOngoingElections(response.data);
                } else if (selectedTab === 'upcoming') {
                    setUpcomingElections(response.data);
                } else if (selectedTab === 'past') {
                    setPastElections(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching elections:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedTab]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

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
                  <Button
                      onClick={() => navigate("/Election/Create")}
                      variant="contained"
                      startIcon={<CreateIcon/>}
                      sx={{backgroundColor: '#1976d2', color: '#fff', '&:hover': {backgroundColor: '#115293'}}}
                  >
                      Create New Election
                  </Button>
              </div>
          </div>
          <div className='electionContainer'>
              <div className='tabHeader flex justify-end p-4 border-b border-gray-300'>
                  <Tabs
                      value={selectedTab}
                      onChange={handleTabChange}
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="election tabs"
                      className="flex"
                  >
                      <Tab label="Ongoing" value="ongoing"/>
                      <Tab label="Upcoming" value="upcoming"/>
                      <Tab label="Past" value="past"/>
                  </Tabs>
              </div>

              <div className='electionList'>
                  {loading ? (
                      <div className="flex justify-center items-center">
                          <CircularProgress/>
                      </div>
                  ) : (
                      <>
                          {selectedTab === 'ongoing' &&
                              <Elections topic="Ongoing Elections" electionData={ongoingElections}/>}
                          {selectedTab === 'upcoming' &&
                              <Elections topic="Upcoming Elections" electionData={upcomingElections}/>}
                          {selectedTab === 'past' && <Elections topic="Past Elections" electionData={pastElections}/>}
                      </>
                  )}
              </div>
          </div>
      </div>
    )
}
