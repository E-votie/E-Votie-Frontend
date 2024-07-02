import Header from "./Components/Header";
import {Outlet} from "react-router-dom";
import {Footer} from "./Components/Footer.jsx";

function Layout(){
    return(
        <div className="flex flex-col min-h-screen">
            <div className="h-[10%]">
                <Header></Header>
            </div>
            <div className="h-[80%] flex-grow px-8 py-8 border-2 border-red-600">
                <Outlet />
            </div>            
            <div className="h-[10%]">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Layout;