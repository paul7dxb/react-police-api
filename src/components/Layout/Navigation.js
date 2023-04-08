import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import { useState } from "react";
// import hamburger from "../assets/icons/hamburger.svg";
import { GiHamburgerMenu } from "react-icons/gi";

const Navigation = () => {
	const [showNavbar, setShowNavbar] = useState(false);

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};

	return (
		<header className={classes.header}>
			<GiHamburgerMenu className={classes.menuIcon} onClick={handleShowNavbar}/>
			<nav >
				<ul className={showNavbar? classes.navbarActive : ""}>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/forces"
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							Forces
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/search"
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							Search
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/more-info"
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							More Info
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navigation;
