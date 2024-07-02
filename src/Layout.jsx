import Header from "./Components/Header";
import {Outlet} from "react-router-dom";
import {Footer} from "./Components/Footer.jsx";

function Layout(){
    return(
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <div className="flex-grow px-8 py-4">
                <Outlet />
            </div>            
            <Footer></Footer>
        </div>
    )
}

export default Layout;