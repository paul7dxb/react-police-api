import Navigation from "../components/Layout/Navigation";
import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";


const RootLayout = (props) => {
  return (
    <>
      <Navigation />
      <main className={classes.main}> <Outlet/> </main>
    </>
  );
};

export default RootLayout;
