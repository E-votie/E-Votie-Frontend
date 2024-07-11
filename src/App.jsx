import "./App.css";

import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';
import {VoterRegistration_1} from "./Pages/VoterRegistration/VoterRegistration_1";
import {Layout} from "./Layout.jsx";
import {Home} from "./Pages/Home.jsx";
import {Party} from "./Pages/Party/Party.jsx";
import {PartyList} from "./Pages/Party/PartyList.jsx";
import {PartyRegistration} from "./Pages/Party/PartyRegistration";
import {Announcements} from "./Pages/Announcements";
import {Inquiries} from "./Pages/Party/Inquiries";
import {VoterRegistration_2} from "./Pages/VoterRegistration/VoterRegistration_2.jsx";
import {EmailVerification} from "./Pages/VoterRegistration/EmailVerification.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import {FormReview} from "./Pages/GramaNiladhari/FormReview.jsx";
import {GnHome} from "./Pages/GramaNiladhari/GnHome.jsx";
import {VoterApplications} from "./Pages/GramaNiladhari/VoterApplications.jsx";
import ProtectedRoute from "./services/ProtectedRoute.jsx";

const queryClient = new QueryClient()

function App() {
    const userRole = localStorage.getItem('userRole') || 'guest';

    return (
        <QueryClientProvider client={queryClient} >
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/VoterRegistration" element={<VoterRegistration_1 />} />
                            <Route path="/VoterRegistration" element={<QueryClientProvider client={queryClient}> <VoterRegistration_1/> </QueryClientProvider>} />
                            <Route path="/VoterRegistration/:ApplicationID" element={<QueryClientProvider client={queryClient}> <VoterRegistration_2/> </QueryClientProvider>} />
                            <Route path="/verify/:Hash" element={<QueryClientProvider client={queryClient}> <EmailVerification /> </QueryClientProvider>} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/announcements" element={<Announcements />} />
                            <Route path="/inquiries" element={<Inquiries />} />
                            <Route path="/party/:partyId" element={<Party />} />
                            <Route path="/party/list" element={<PartyList />} />
                            <Route path="/party/registration" element={<PartyRegistration />} />
                            <Route
                                path="/GN"
                                element={
                                    <ProtectedRoute
                                        element={GnHome}
                                        role="GramaNiladhari"
                                    />
                                }
                            />
                            <Route
                                path="/GN/voter_applications"
                                element={
                                    <ProtectedRoute
                                        element={VoterApplications}
                                        role="GramaNiladhari"
                                    />
                                }
                            />
                            <Route
                                path="/GN/form_review/:ApplicationID"
                                element={
                                    <ProtectedRoute
                                        element={FormReview}
                                        role="GramaNiladhari"
                                    />
                                }
                            />
                            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </QueryClientProvider>
    );
}

export default App;