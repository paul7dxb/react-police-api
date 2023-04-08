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
	const navLinkSelectHandler = () => {
		setShowNavbar(false);
	};

	return (
		<header className={classes.header}>
			<GiHamburgerMenu
				className={classes.menuIcon}
				onClick={handleShowNavbar}
			/>
			<nav>
				<ul className={showNavbar ? classes.navbarActive : ""}>
					<li>
						<NavLink
							onClick={navLinkSelectHandler}
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
							onClick={navLinkSelectHandler}
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
							onClick={navLinkSelectHandler}
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
							onClick={navLinkSelectHandler}
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
