import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {VoterRegistration_1} from "./Pages/VoterRegistration/VoterRegistration_1";
import {Layout} from "./Layout.jsx";
import {Home} from "./Pages/PartyMember/Home.jsx";
import { QueryClient, QueryClientProvider } from 'react-query'
import {EmailVerification} from "./Pages/VoterRegistration/EmailVerification.jsx";
import {VoterRegistration_2} from "./Pages/VoterRegistration/VoterRegistration_2.jsx";
const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/VoterRegistration" element={<QueryClientProvider client={queryClient}> <VoterRegistration_1/> </QueryClientProvider>} />
                        <Route path="/VoterRegistration/:ApplicationID" element={<QueryClientProvider client={queryClient}> <VoterRegistration_2/> </QueryClientProvider>} />
                        <Route path="/verify/:Hash" element={<QueryClientProvider client={queryClient}> <EmailVerification /> </QueryClientProvider>} />
                        <Route path="/home" element={<Home />} />
                        <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;