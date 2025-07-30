import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
   return (
      <>
         <Navbar />
         <Outlet />
         <Footer />
      </>
   );
}

export default MainLayout;
