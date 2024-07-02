import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {VoterRegistration} from "./Pages/VoterRegistration/VoterRegistration_1";
import Layout from './Layout';

function App() {
    return (
        <div className="App">
            <Router>
                {/*<Navbar />*/}
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/VoterRegistration" element={<VoterRegistration />} />
                        <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;