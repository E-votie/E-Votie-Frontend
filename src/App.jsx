import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {VoterRegistration} from "./Pages/VoterRegistration/VoterRegistration_1";
import {Header} from "./Components/Header.jsx";
import {Navbar} from "./Components/Navbar.jsx";
import {Breadcrumbs} from "./Components/Breadcrumbs.jsx";
import {Bot} from "./Components/Bot.jsx";
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Navbar/>
                <div className="mx-28">
                    <Breadcrumbs/>
                    <Routes>
                            <Route path="/VoterRegistration" element={<QueryClientProvider client={queryClient}><VoterRegistration/></QueryClientProvider>}/>
                            <Route path="*" element={<h1> PAGE NOT FOUND</h1>}/>
                    </Routes>
                </div>
                <Bot/>
            </Router>
        </div>
    );
}

export default App;