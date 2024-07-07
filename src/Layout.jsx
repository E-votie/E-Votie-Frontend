import {Outlet} from "react-router-dom";
import {Footer} from "./Components/Footer.jsx";
import {Navbar} from "./Components/Navbar.jsx";
import {Breadcrumbs} from "./Components/Breadcrumbs.jsx";

export const Layout = () => {
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex grow w-full md:px-24">
                <div className="w-full">
                    <Breadcrumbs/>
                    <Outlet />
                </div>
            </div>            
            <Footer></Footer>
        </div>
    )
}

