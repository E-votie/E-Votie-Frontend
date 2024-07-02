import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {VoterRegistration} from "./Pages/VoterRegistration/VoterRegistration_1";
import {Header} from "./Components/Header.jsx";
import {Navbar} from "./Components/Navbar.jsx";
import {Breadcrumbs} from "./Components/Breadcrumbs.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Navbar/>
                <Breadcrumbs/>
                <Routes>
                    <Route path="/VoterRegistration" element={<VoterRegistration/>}/>
                    <Route path="*" element={<h1> PAGE NOT FOUND</h1>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;