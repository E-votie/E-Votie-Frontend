import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {VoterRegistration} from "./Pages/VoterRegistration/VoterRegistration_1";
import {Footer} from "./Components/Footer.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                {/*<Navbar />*/}
                <Routes>
                    <Route path="/VoterRegistration" element={<VoterRegistration />} />
                    <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;