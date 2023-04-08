import classes from "./TestNavBar.module.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as Hamburger } from "../assets/icons/hamburger.svg";
import { useState } from "react";

const TestNavBar = () => {
	const [showNavbar, setShowNavbar] = useState(false);

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};
	return (
		<nav className={classes.navbar}>
			<div className={classes.container}>
				{/* <div className={classes.logo}>
            <Brand />
          </div> */}
				<div className={classes.menuIcon} onClick={handleShowNavbar}>
					<Hamburger />
				</div>
				<div className={`nav-elements  ${showNavbar && "active"}`}>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/blog">Blog</NavLink>
						</li>
						<li>
							<NavLink to="/projects">Projects</NavLink>
						</li>
						<li>
							<NavLink to="/about">About</NavLink>
						</li>
						<li>
							<NavLink to="/contact">Contact</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default TestNavBar;
