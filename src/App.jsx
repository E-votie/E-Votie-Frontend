import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { VoterRegistration } from "./Pages/VoterRegistration/VoterRegistration_1";
import { Layout } from "./Layout.jsx";
import { Home } from "./Pages/Home.jsx";
import { Party } from "./Pages/Party/Party.jsx";
import { PartyList } from "./Pages/Party/PartyList.jsx";
import { PartyRegistration } from "./Pages/Party/PartyRegistration";
import { Announcements } from "./Pages/Announcements";
import { Inquiries } from "./Pages/Party/Inquiries";

import "./App.css";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient} >
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/VoterRegistration" element={<VoterRegistration />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/announcements" element={<Announcements />} />
                            <Route path="/inquiries" element={<Inquiries />} />
                            <Route path="/party/:partyId" element={<Party />} />
                            <Route path="/party/list" element={<PartyList />} />
                            <Route path="/party/registration" element={<PartyRegistration />} />
                            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </QueryClientProvider>
    );
}

export default App;
