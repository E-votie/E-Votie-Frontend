import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from "./Layout.jsx";
import { Home } from "./Pages/Home.jsx";
import "./App.css";
import { ReportView } from "./Pages/ReportGeneration/ReportView.jsx";
import { VotingView } from "./Pages/VoterVerification_UI/VoterView.jsx";
import { ResultView } from "./Pages/ReportGeneration/ResultView.jsx";
import { DistrictResultView } from "./Pages/ReportGeneration/DistrictResult.jsx";
import NewHome from "./Pages/Home_New.jsx";
import AdminRoutes from "./Routes/AdminRoutes.jsx";
import {VoterRegistration_1} from "./Pages/VoterRegistration/VoterRegistration_1.jsx";
import {VoterRegistration_2} from "./Pages/VoterRegistration/VoterRegistration_2.jsx";
import {EmailVerification} from "./Pages/VoterRegistration/EmailVerification.jsx";
import PartyRoutes from "./Routes/PartyRoutes.jsx";
import ElectionRoutes from "./Routes/ElectionRoutes.jsx";
import GramaNiladhariRoutes from "./Routes/GramaNiladhariRoutes.jsx";
import VerificationOfficerRoutes from "./Routes/VerificationOfficerRoutes.jsx";
import VotingRoutes from "./Routes/VotingRoutes.jsx";
import VoterRoutes from "./Routes/VoterRoutes.jsx";
import { UserProfile } from "./Components/UserProfile.jsx";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<NewHome />} />
                            <Route path="Special_home" element={<Home />} />
                            <Route path="election/result" element={<ResultView />} />
                            <Route path="election/result/district/:District" element={<DistrictResultView />} />
                            <Route path="reports/View" element={<ReportView />} />
                            <Route path="poling_station/voter_verification" element={<VotingView />} />
                            <Route path="voter/profile" element={<UserProfile />} />

                            {/* Include nested route components */}
                            <Route path="/VoterRegistration" element={<QueryClientProvider client={queryClient}> <VoterRegistration_1/> </QueryClientProvider>} />
                            <Route path="/VoterRegistration/:ApplicationID" element={<QueryClientProvider client={queryClient}> <VoterRegistration_2/> </QueryClientProvider>} />
                            <Route path="/verify/:Hash" element={<QueryClientProvider client={queryClient}> <EmailVerification /> </QueryClientProvider>} />
                            {AdminRoutes()}
                            {VoterRoutes()}
                            {PartyRoutes()}
                            {ElectionRoutes()}
                            {VotingRoutes()}
                            {GramaNiladhariRoutes()}
                            {VerificationOfficerRoutes()}

                            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </QueryClientProvider>
    );
}

export default App;