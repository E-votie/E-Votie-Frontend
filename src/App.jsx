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
import { Manifesto } from "./Pages/Party/Manifesto";
import {PartyMember} from "./Pages/Party/PartyMember";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import {FormReview} from "./Pages/GramaNiladhari/FormReview.jsx";
import {GnHome} from "./Pages/GramaNiladhari/GnHome.jsx";
import {VoterApplications} from "./Pages/GramaNiladhari/VoterApplications.jsx";
import ProtectedRoute from "./services/ProtectedRoute.jsx";
import {ElectionList} from "./Pages/Party/ElectionList";
import {Election} from "./Pages/Party/Election";
import {VerificationHome} from "./Pages/VerificationOfficer/VerificationHome.jsx";
import {VoterApplicationsVerificationOfficer} from "./Pages/VerificationOfficer/VoterApplications.jsx";
import {FormReviewVerificationOfficer} from "./Pages/VerificationOfficer/FormReview.jsx";
import {Election_Home} from "./Pages/Election/Election_Home.jsx";
import {Election_Announcements} from "./Pages/Election/Election_Announcements.jsx";
import {CreateElection} from "./Pages/Election/CreateElection.jsx";
import {Create_Announcements} from "./Pages/Election/Create_Announcements.jsx";


import "./App.css";
import {VoterDetails} from "./Pages/Voter/VoterDetails.jsx";
import {FingerprintReg} from "./Pages/VerificationOfficer/FingerprintReg.jsx";
import {ElectionRegistration} from "./Pages/Voter/ElectionRegistration.jsx";
import {ElectionRegistrationForm} from "./Pages/Voter/ElectionRegistrationForm.jsx";
import {ReportView} from "./Pages/ReportGeneration/ReportView.jsx";
import { PartyApplication } from "./Pages/Party/PartyApplication";
import Polling_Stations from "./Pages/Election/Polling_Stations.jsx";
import ApprovePartyMembers from "./Pages/Election/ApprovePartyMembers.jsx";
import { SelectNominations } from "./Components/selectNominations";
import { CandidateApplicationsVerificationOfficer } from "./Pages/VerificationOfficer/CandidateApplications.jsx";


// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
    const userRole = localStorage.getItem('userRole') || 'guest';

    return (
        <QueryClientProvider client={queryClient} >
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/" element={<Home />} />
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
                            <Route path="/party/registration/application" element={<PartyApplication />} />
                            <Route path="/party/member" element={<PartyMember />} />
                            <Route path="/party/member/manifesto" element={<Manifesto />} />
                            <Route path="/election/list" element={<ElectionList />} />
                            <Route path="/election" element={<Election />} />
                            <Route path="/reports/View" element={<ReportView />} />
                            <Route path="/Approve" element={<ApprovePartyMembers />} />
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
                            <Route
                                path="/verification_officer"
                                element={
                                    <ProtectedRoute
                                        element={VerificationHome}
                                        role="VerificationOfficer"
                                    />
                                }
                            />
                            <Route
                                path="/verification_officer/voter_applications"
                                element={
                                    <ProtectedRoute
                                        element={VoterApplicationsVerificationOfficer}
                                        role="VerificationOfficer"
                                    />
                                }
                            />
                            <Route
                                path="/verification_officer/form_review/:ApplicationID"
                                element={
                                    <ProtectedRoute
                                        element={FormReviewVerificationOfficer}
                                        role="VerificationOfficer"
                                    />
                                }
                            />
                            <Route
                                path="/voter/profile"
                                element={
                                    <ProtectedRoute
                                        element={VoterDetails}
                                        role="Voter"
                                    />
                                }
                            />
                            <Route
                                path="/verification_officer/fingerprint_scan"
                                element={
                                    <ProtectedRoute
                                        element={FingerprintReg}
                                        role="VerificationOfficer"
                                    />
                                }
                            />
                            <Route
                                path="/voter/election_registration"
                                element={
                                    <ProtectedRoute
                                        element={ElectionRegistration}
                                        role="Voter"
                                    />
                                }
                            />
                            <Route
                                path="/voter/election_registration/:ElectionID"
                                element={
                                    <ProtectedRoute
                                        element={ElectionRegistrationForm}
                                        role="Voter"
                                    />
                                }
                            />
                            <Route path="/Election/Create" element={<CreateElection />} />
                            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
                            <Route path="/Election/Home" element={<Election_Home />} />
                            <Route path="/Election/Announcements" element={<Election_Announcements />} />
                            <Route path="/Election/Create_Announcements" element={<Create_Announcements />} />
                            <Route path="/Election/Polling_Stations" element={<Polling_Stations />} />
                            <Route path="/election/nominations" element={<SelectNominations />} />
                            <Route path="/voter/registration/1" element={<VoterRegistration_1 />} />
                            <Route path="/voter/registration/2" element={<VoterRegistration_2 />} />
                            <Route path="/verification_officer/candidate_applications" element={<CandidateApplicationsVerificationOfficer />} />

                        </Route>
                    </Routes>
                </Router>
            </div>
        </QueryClientProvider>
    );
}

export default App;