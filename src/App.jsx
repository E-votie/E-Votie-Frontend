import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {VoterRegistration} from "./Pages/VoterRegistration/VoterRegistration_1";
import {Layout} from "./Layout.jsx";
import {Home} from "./Pages/Home.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/VoterRegistration" element={<VoterRegistration />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;