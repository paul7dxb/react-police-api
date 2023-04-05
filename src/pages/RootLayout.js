import Navigation from "../components/Layout/Navigation";
import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import Footer from "../components/Layout/Footer";


const RootLayout = (props) => {
  return (
    <>
      <Navigation />
      <main className={classes.main}> <Outlet/> </main>
      <Footer />
    </>
  );
};

export default RootLayout;
